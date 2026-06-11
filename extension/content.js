// Petit Bridge Audio Guide - content script
// Speaks every page of the Genially game aloud for blind and low-vision
// players, and exposes all interactive elements through the keyboard.
//
// Speech is played from pre-generated neural audio files (audio-map.js)
// whenever the exact sentence is known at build time, with the browser's
// speech synthesis as fallback for dynamic text. Announcements are built
// as SEGMENTS (sentences/blocks) separated by short pauses, so the
// narration breathes instead of running on.
//
// Keys: H help, R repeat, Q question/options, L list clickables,
//       1-9 activate item, V validate/submit, C ask a question (Claude),
//       S or Escape stop voice, T toggle French/English, + and - rate.

(() => {
  'use strict';

  // ---------------------------------------------------------------- state
  const GENIALLY_ID = (location.pathname.match(/[0-9a-f]{24}/) || [null])[0];
  const CURATED_ALL = window.PBA_DESCRIPTIONS || {};
  const CURATED = (GENIALLY_ID && CURATED_ALL[GENIALLY_ID]) || null;
  const BUNDLED = (window.PBA_GAMES && window.PBA_GAMES[GENIALLY_ID]) || null;
  const UI = window.PBA_STRINGS;
  // Audio map is per game (each game has its own narrator voice).
  const AUDIO_MAP = (window.PBA_AUDIO && window.PBA_AUDIO[GENIALLY_ID]) || {};

  const settings = { enabled: true, lang: 'fr', rate: 1.0, verbose: false };
  let model = BUNDLED;          // {title, total, slides:[{id, order, name, popup, texts, activity}]}
  let slidesById = {};
  let currentSlideId = null;
  let lastAnnouncement = [];    // segments, for the R (repeat) key
  let interactives = [];        // numbered items for the current slide
  let lastSlideText = '';       // for feedback diffing
  let pendingDrag = null;       // grabbed drag item awaiting a target choice
  let hadUserGesture = false;
  let pendingSpeech = null;     // queued until first user gesture (Chrome autoplay policy)

  const T = () => UI[settings.lang] || UI.fr;
  const PAUSE = '§';            // segment marker: extra breath between blocks
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // ---------------------------------------------------------------- utils
  const log = (...a) => console.log('[PBA]', ...a);

  function cleanText(el) {
    if (!el) return '';
    const clone = el.cloneNode(true);
    clone.querySelectorAll('style, script').forEach(n => n.remove());
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }

  // Visible text only (innerText respects visibility) - used for feedback
  // diffing so elements revealed by the game are detected as "new" text.
  function visibleText(el) {
    if (!el) return '';
    return (el.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function translate(s) {
    if (settings.lang === 'fr' || !CURATED || !CURATED.translate) return s;
    if (CURATED.translate[s]) return CURATED.translate[s];
    const trimmed = s.trim();
    return CURATED.translate[trimmed] || s;
  }

  function curatedSlide(id) {
    if (!CURATED || !CURATED.slides) return null;
    return CURATED.slides[id] || null;
  }

  function labelFor(id) {
    if (!CURATED || !CURATED.labels) return null;
    const hit = CURATED.labels[id] || CURATED.labels[id.slice(0, 8)];
    return hit ? (hit[settings.lang] || hit.fr) : null;
  }

  // Card name from a card image inside the element, or - for transparent
  // drag overlays - from the card image lying under the element's center.
  function lookupCard(src) {
    const cards = window.PBA_CARDS;
    if (!cards || !src) return null;
    const hit = cards[src.split('/').pop().replace(/\.\w+$/, '')];
    return hit ? (hit[settings.lang] || hit.fr) : null;
  }

  function bgUrl(el) {
    const bg = getComputedStyle(el).backgroundImage || '';
    const m = bg.match(/url\(["']?([^"')]+)/);
    return m ? m[1] : null;
  }

  function cardLabel(el, slideEl) {
    if (el.tagName === 'IMG') {
      const hit = lookupCard(el.src);
      if (hit) return hit;
    }
    for (const img of el.querySelectorAll('img[src]')) {
      const hit = lookupCard(img.src);
      if (hit) return hit;
    }
    const own = lookupCard(bgUrl(el));
    if (own) return own;
    // geometric fallback: card image overlapping this element's center
    if (slideEl) {
      const r = el.getBoundingClientRect();
      const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
      const candidates = [...slideEl.querySelectorAll('img[src]')]
        .map(img => ({ img, hit: lookupCard(img.src) }))
        .filter(c => c.hit);
      for (const { img, hit } of candidates) {
        const b = img.getBoundingClientRect();
        if (cx >= b.x && cx <= b.x + b.width && cy >= b.y && cy <= b.y + b.height) return hit;
      }
      // last resort: closest card image center within 80px
      let best = null, bestD = 80;
      for (const { img, hit } of candidates) {
        const b = img.getBoundingClientRect();
        const d = Math.hypot(b.x + b.width / 2 - cx, b.y + b.height / 2 - cy);
        if (d < bestD) { bestD = d; best = hit; }
      }
      if (best) return best;
    }
    return null;
  }

  // ---------------------------------------------------------------- speech
  let voices = [];
  function refreshVoices() { voices = speechSynthesis.getVoices(); }
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;

  function pickVoice() {
    const want = settings.lang === 'en' ? 'en' : 'fr';
    const c = voices.filter(v => v.lang.toLowerCase().startsWith(want));
    return (
      c.find(v => /natural|neural|online/i.test(v.name)) ||
      c.find(v => /google/i.test(v.name)) ||
      c.find(v => v.localService && v.default) ||
      c.find(v => v.localService) ||
      c[0] || null
    );
  }

  // Chrome stops long utterances: chunk by sentence into <= ~200 chars.
  function chunkText(text) {
    const sentences = text.match(/[^.!?]+[.!?]+[\s]*|[^.!?]+$/g) || [text];
    const chunks = [];
    let buf = '';
    for (const s of sentences) {
      if ((buf + s).length > 200 && buf) { chunks.push(buf.trim()); buf = s; }
      else buf += s;
    }
    if (buf.trim()) chunks.push(buf.trim());
    return chunks;
  }

  // Pre-generated audio lookup: keys are "<lang>|<text>" with collapsed
  // whitespace and no trailing period (see tools/build_audio.py).
  const normKey = s => s.replace(/\s+/g, ' ').trim().replace(/\.+$/, '');
  function audioFileFor(text) {
    return AUDIO_MAP[settings.lang + '|' + normKey(text)] || null;
  }

  // Duck the game's own sounds while the guide is talking, restore after.
  let ducked = [];
  function duck(on) {
    if (on) {
      if (ducked.length) return;
      document.querySelectorAll('audio, video').forEach(m => {
        ducked.push([m, m.volume]);
        try { m.volume = Math.min(m.volume, 0.15); } catch (_) {}
      });
    } else {
      for (const [m, v] of ducked) { try { m.volume = v; } catch (_) {} }
      ducked = [];
    }
  }

  let speechQueue = [];
  let speaking = false;
  let speechEpoch = 0;
  let currentAudio = null;

  function playAudio(file) {
    return new Promise(resolve => {
      const a = new Audio(chrome.runtime.getURL('audio/' + file));
      a.playbackRate = settings.rate;
      currentAudio = a;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        if (currentAudio === a) currentAudio = null;
        resolve();
      };
      a.addEventListener('ended', finish);
      a.addEventListener('error', finish);
      a.addEventListener('pause', () => { if (!a.ended) finish(); });
      a.play().catch(finish);
    });
  }

  function speakSynthSegment(text, epoch) {
    return new Promise(resolve => {
      const voice = pickVoice();
      const chunks = chunkText(text);
      let i = 0;
      const next = () => {
        if (epoch !== speechEpoch || i >= chunks.length) { resolve(); return; }
        const u = new SpeechSynthesisUtterance(chunks[i++]);
        u.lang = settings.lang === 'en' ? 'en-US' : 'fr-FR';
        if (voice) u.voice = voice;
        u.rate = settings.rate;
        u.onend = () => setTimeout(next, 180);   // small breath between sentences
        u.onerror = () => resolve();
        speechSynthesis.speak(u);
      };
      next();
    });
  }

  // Workaround for Chrome pausing synthesis after ~15s of speech.
  let resumeTimer = null;
  function keepSynthAlive() {
    clearInterval(resumeTimer);
    resumeTimer = setInterval(() => {
      if (!speechSynthesis.speaking) { clearInterval(resumeTimer); return; }
      speechSynthesis.pause();
      speechSynthesis.resume();
    }, 10000);
  }

  async function pump() {
    if (speaking) return;
    speaking = true;
    duck(true);
    const epoch = speechEpoch;
    while (speechQueue.length && epoch === speechEpoch) {
      const seg = speechQueue.shift();
      if (seg === PAUSE) { await sleep(550); continue; }
      const file = audioFileFor(seg);
      if (file) {
        await playAudio(file);
      } else {
        keepSynthAlive();
        // ALL-CAPS labels get spelled out or mangled by the synth voice.
        const txt = seg.length >= 3 && seg === seg.toUpperCase() && /[A-ZÀ-Ü]/.test(seg)
          ? seg[0] + seg.slice(1).toLowerCase() : seg;
        await speakSynthSegment(txt, epoch);
      }
      if (epoch === speechEpoch) await sleep(280); // breath between segments
    }
    speaking = false;
    if (speechQueue.length) { pump(); return; }   // segments queued during the run
    if (epoch === speechEpoch) duck(false);
  }

  let lastSpoken = '', lastSpokenAt = 0;
  function speak(textOrSegments, { interrupt = true } = {}) {
    if (!settings.enabled) return;
    const segments = (Array.isArray(textOrSegments) ? textOrSegments : [textOrSegments])
      .map(s => (s == null ? '' : String(s)))
      .map(s => (s === PAUSE ? s : s.replace(/\s+/g, ' ').trim()))
      .filter(s => s);
    const joined = segments.filter(s => s !== PAUSE).join(' ');
    if (!joined) return;
    if (joined === lastSpoken && Date.now() - lastSpokenAt < 3000) return;
    lastSpoken = joined; lastSpokenAt = Date.now();
    log('speak:', joined.slice(0, 1500));
    if (!hadUserGesture) {
      // Accumulate instead of overwrite, so the welcome announcement is not
      // lost when the game reveals extra text before the first key press.
      if (pendingSpeech) pendingSpeech.segments.push(PAUSE, ...segments);
      else pendingSpeech = { segments, interrupt };
      return;
    }
    if (interrupt) cancelPlayback();
    speechQueue.push(...segments);
    pump();
  }

  function cancelPlayback() {
    speechEpoch++;
    speechQueue = [];
    speechSynthesis.cancel();
    if (currentAudio) { try { currentAudio.pause(); } catch (_) {} currentAudio = null; }
    duck(false);
  }

  function stopSpeech() { cancelPlayback(); }

  async function speechIdle() {
    while (speaking || speechQueue.length) await sleep(150);
  }

  // ---------------------------------------------------------------- model
  async function loadModel() {
    if (!GENIALLY_ID) return;
    if (!model) {
      try {
        const res = await fetch(`${location.origin}/api/view/${GENIALLY_ID}`);
        if (res.ok) {
          const data = await res.json();
          model = buildModelFromApi(data);
          log('model loaded from API');
        }
      } catch (e) { log('API fetch failed', e); }
    }
    if (model) {
      slidesById = {};
      for (const s of model.slides) slidesById[s.id] = s;
    }
  }

  function stripHtml(s) {
    if (!s) return '';
    // DOMParser gives an inert document: no script execution, no resource loads.
    const doc = new DOMParser().parseFromString(s, 'text/html');
    doc.querySelectorAll('style, script').forEach(n => n.remove());
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function buildModelFromApi(data) {
    const textsBySlide = {};
    for (const t of [...(data.Texts || []), ...(data.RichContents || [])]) {
      const msg = stripHtml(t.TextMessage || t.Html || '');
      if (t.IdSlide && msg) {
        (textsBySlide[t.IdSlide] = textsBySlide[t.IdSlide] || []).push({
          order: t.ReadingOrder || 99, msg
        });
      }
    }
    const actsBySlide = {};
    for (const a of data.Activities || []) {
      const blanks = a.Type === 'FILL_IN_THE_BLANKS_ACTIVITY' && a.Text
        ? stripHtml(a.Text.replace(/<blank-react-node[^>]*>(<\/blank-react-node>)?/g, ' ___ '))
        : '';
      actsBySlide[a.IdSlide] = {
        type: a.Type,
        question: stripHtml(a.Question),
        blanks,
        answers: (a.Answers || []).map(x => ({
          text: stripHtml(x.Text || ''), correct: !!x.IsCorrect
        })),
        feedbackOk: stripHtml((a.Options || {}).CorrectAnswerFeedback || ''),
        feedbackKo: stripHtml((a.Options || {}).IncorrectAnswerFeedback || '')
      };
    }
    const visible = (data.Slides || []).filter(s => !s.Hidden);
    const slides = visible
      .sort((a, b) => a.Order - b.Order)
      .map(s => ({
        id: s.Id,
        order: s.Order,
        name: (s.Name || '').trim(),
        popup: !!s.Popup,
        texts: (textsBySlide[s.Id] || []).sort((a, b) => a.order - b.order).map(t => t.msg),
        activity: actsBySlide[s.Id] || null
      }));
    return {
      geniallyId: GENIALLY_ID,
      title: (data.Genially || {}).Name || document.title,
      total: slides.filter(s => !s.popup).length,
      slides
    };
  }

  // ----------------------------------------------------- slide detection
  function getCurrentSlideEl() {
    const els = [...document.querySelectorAll('.genially-view-slide[id]')]
      .filter(e => e.id !== 'transversal-id' && e.offsetParent !== null);
    return els[els.length - 1] || null; // popups are appended after the base slide
  }

  // ------------------------------------------------------- interactives
  function segsOf(item) { return item.segs || [item.label]; }

  function collectInteractives(slideEl) {
    const items = [];
    const seen = new Set();
    const add = (el, kind, label, segs) => {
      if (!el || seen.has(el)) return;
      seen.add(el);
      items.push({ el, kind, label, segs });
    };

    // 1. quiz answers (radio role) - DOM order matches what sighted users see
    slideEl.querySelectorAll('[role="radio"]').forEach(el => {
      const txt = cleanText(el);
      const label = txt ? translate(txt) : (cardLabel(el, slideEl) || T().interactiveItem(items.length + 1));
      add(el, 'answer', label);
    });

    // 2. fill-in-the-blanks words: the word bank only. Gap slots live inside
    //    the [role="textbox"] paragraph; clicking a bank word fills the next
    //    empty gap, so the gaps themselves don't need numbers.
    slideEl.querySelectorAll('[role="form"] [role="button"]').forEach(el => {
      if (el.closest('[role="textbox"]')) return;
      const txt = cleanText(el);
      if (txt && txt.length < 40) add(el, 'word', translate(txt));
    });

    // 3. real buttons (Envoyer / submit). Genially labels the blanks submit
    // button "Send" even in French games.
    slideEl.querySelectorAll('button').forEach(el => {
      const txt = cleanText(el);
      if (!txt) return;
      const label = /^send$/i.test(txt) && settings.lang === 'fr' ? 'Envoyer' : translate(txt);
      add(el, 'submit', label);
    });

    // 4. Genially clickables (cursor pointer, uuid ids), including the
    //    drag-and-drop layers authored as OBJETn / CIBLEn / VERIFICATION.
    const uuidRe = /^[0-9a-f-]{36}$/;
    const t = T();
    slideEl.querySelectorAll('[id]').forEach(el => {
      if (!uuidRe.test(el.id)) return;
      if (el.offsetParent === null) return;
      if (getComputedStyle(el).cursor !== 'pointer') return;
      // skip if a parent clickable is already listed (avoid group + child dupes)
      for (const it of items) if (it.el.contains(el) || el.contains(it.el)) return;
      const txt = cleanText(el);
      if (/^FONCTION\b/i.test(txt)) return;            // internal dnd helper layer
      const card = cardLabel(el, slideEl);
      if (/^OBJET\s*\d*$/i.test(txt)) {
        const n = items.filter(i => i.kind === 'drag').length + 1;
        add(el, 'drag', card || t.dragObj(n));
        return;
      }
      if (/^CIBLE\s*\d*$/i.test(txt)) {
        const n = items.filter(i => i.kind === 'target').length + 1;
        add(el, 'target', t.dropZone(n));
        return;
      }
      if (/^V[ÉE]RIFICATION$/i.test(txt)) {
        add(el, 'submit', settings.lang === 'en' ? 'Verification' : 'Vérification');
        return;
      }
      const curated = labelFor(el.id);
      const aria = el.getAttribute('aria-label');
      let label = curated || (aria && translate(aria)) ||
        (txt && txt.length < 60 ? translate(txt) : null) || card ||
        t.interactiveItem(items.length + 1);
      let segs;
      if (curated && card) { label = `${curated} : ${card}`; segs = [curated, card]; }
      add(el, 'click', label, segs);
    });

    // 5. links with aria-labels (FINAL page external resources)
    slideEl.querySelectorAll('a[href]').forEach(el => {
      const txt = cleanText(el) || el.getAttribute('aria-label') || '';
      if (txt && el.offsetParent !== null) {
        add(el, 'link', `${T().link} : ${translate(txt)}`, [T().link, translate(txt)]);
      }
    });

    return items;
  }

  function simulateClick(el) {
    el.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    const x = r.x + r.width / 2, y = r.y + r.height / 2;
    // Dispatch on the deepest element of THIS layer at the center point, so
    // handlers attached to children fire even when another transparent layer
    // (e.g. the drag-and-drop helper) sits on top.
    const stack = document.elementsFromPoint(x, y);
    const target = stack.find(n => el.contains(n)) || el;
    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
    for (const type of ['pointerover', 'pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
      target.dispatchEvent(type.startsWith('pointer')
        ? new PointerEvent(type, { ...opts, pointerId: 1, pointerType: 'mouse', isPrimary: true })
        : new MouseEvent(type, opts));
    }
  }

  // Simulated pointer drag (Genially's drag-and-drop widget tracks pointer
  // events; verified to move OBJET layers onto CIBLE zones).
  async function simulateDrag(srcEl, dstEl) {
    const sr = srcEl.getBoundingClientRect();
    const dr = dstEl.getBoundingClientRect();
    const sx = sr.x + sr.width / 2, sy = sr.y + sr.height / 2;
    const dx = dr.x + dr.width / 2, dy = dr.y + dr.height / 2;
    const opts = (x, y) => ({
      bubbles: true, cancelable: true, clientX: x, clientY: y,
      pointerId: 1, pointerType: 'mouse', isPrimary: true, view: window, buttons: 1
    });
    const at = (x, y) => document.elementFromPoint(x, y) || document.body;
    let tgt = at(sx, sy);
    tgt.dispatchEvent(new PointerEvent('pointerdown', opts(sx, sy)));
    tgt.dispatchEvent(new MouseEvent('mousedown', opts(sx, sy)));
    await sleep(120);
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      const x = sx + (dx - sx) * i / steps, y = sy + (dy - sy) * i / steps;
      tgt = at(x, y);
      tgt.dispatchEvent(new PointerEvent('pointermove', opts(x, y)));
      tgt.dispatchEvent(new MouseEvent('mousemove', opts(x, y)));
      await sleep(50);
    }
    tgt = at(dx, dy);
    tgt.dispatchEvent(new PointerEvent('pointerup', opts(dx, dy)));
    tgt.dispatchEvent(new MouseEvent('mouseup', opts(dx, dy)));
  }

  // ------------------------------------------------------- announcements
  function describeQuestion(slideEl) {
    const t = T();
    const segs = [];
    const slide = slidesById[currentSlideId];
    const activity = slide && slide.activity;

    if (activity && activity.question) {
      segs.push(`${t.question} ${translate(activity.question)}`);
    }
    // Fill-in-the-blanks: read the gap sentence (___ tokens become "trou").
    if (activity && activity.blanks) {
      segs.push(PAUSE, t.blanksIntro,
        activity.blanks.replace(/___/g, t.blankWord).replace(/\s+/g, ' '));
    }

    const answers = interactives.filter(i => i.kind === 'answer');
    const words = interactives.filter(i => i.kind === 'word');
    const listed = (arr, intro) => {
      segs.push(PAUSE, intro);
      arr.forEach(a => segs.push(`${indexOf(a)}.`, ...segsOf(a).map(s => s + '.')));
    };
    if (answers.length) listed(answers, t.options);
    else if (words.length) listed(words, t.words);
    return segs;
  }

  function indexOf(item) { return interactives.indexOf(item) + 1; }

  function composeAnnouncement(slideEl) {
    const t = T();
    const segs = [];
    const slide = slidesById[currentSlideId];
    const curated = curatedSlide(currentSlideId);

    if (settings.lang === 'en' && curated && curated.en && curated.en.full) {
      segs.push(PAUSE, curated.en.full);
    } else {
      if (curated && curated.fr && curated.fr.pre && settings.lang === 'fr') {
        segs.push(PAUSE, curated.fr.pre);
      }
      if (slide && slide.texts.length) {
        // Skip duplicated question text; activity is read by describeQuestion.
        const qa = slide.activity ? slide.activity.question : null;
        // Skip short texts already covered by the game title or the curated
        // preamble (e.g. the title repeated as decorative text on the page).
        const titleStr = CURATED && CURATED.title
          ? (CURATED.title[settings.lang] || CURATED.title.fr) : '';
        const already = (titleStr + ' ' + segs.filter(x => x !== PAUSE).join(' '))
          .replace(/\s+/g, ' ').toLowerCase();
        segs.push(PAUSE);
        for (const txt of slide.texts) {
          if (qa && txt === qa) continue;
          const spoken = settings.lang === 'en' ? translate(txt) : txt;
          const n = spoken.replace(/\s+/g, ' ').trim().toLowerCase();
          if (n.length < 80 && already.includes(n)) continue;
          segs.push(spoken);
        }
      }
      if (!slide) {
        // Unknown slide (other genially or missing model): read the DOM.
        const domText = cleanText(slideEl);
        if (domText) segs.push(domText.slice(0, 1200));
      }
    }

    // Audiodescription option: rich scenery description (also on key D).
    const detail = curated && curated[settings.lang] && curated[settings.lang].detail;
    if (settings.verbose && detail) segs.push(PAUSE, detail);

    const q = describeQuestion(slideEl);
    if (q.length) segs.push(PAUSE, ...q);

    const clickables = interactives.filter(i => i.kind === 'click' || i.kind === 'link' || i.kind === 'submit');
    if (!interactives.some(i => i.kind === 'answer' || i.kind === 'word') && clickables.length) {
      segs.push(PAUSE, t.items(clickables.length));
      if (clickables.length <= 3) {
        clickables.forEach(c => segs.push(`${indexOf(c)}.`, ...segsOf(c).map(s => s + '.')));
      }
    }
    return segs;
  }

  // Both boot() and the mutation observer can detect the same slide; only
  // announce it once (R repeats explicitly).
  let lastAnnouncedId = null, lastAnnouncedAt = 0;

  function announceSlide(slideEl, { repeat = false } = {}) {
    if (!repeat && slideEl.id === lastAnnouncedId && Date.now() - lastAnnouncedAt < 5000) return;
    lastAnnouncedId = slideEl.id; lastAnnouncedAt = Date.now();
    interactives = collectInteractives(slideEl);
    const segs = repeat && lastAnnouncement.length ? lastAnnouncement : composeAnnouncement(slideEl);
    lastAnnouncement = segs;
    lastSlideText = visibleText(slideEl);
    speak([...segs]);

    // If the model says this slide has an activity but its options were not
    // rendered yet, announce the question once they appear.
    const slide = slidesById[slideEl.id];
    if (!repeat && slide && slide.activity &&
        !interactives.some(i => i.kind === 'answer' || i.kind === 'word')) {
      const slideId = slideEl.id;
      let tries = 0;
      const retry = setInterval(() => {
        if (++tries > 10 || currentSlideId !== slideId) { clearInterval(retry); return; }
        const el = getCurrentSlideEl();
        if (!el) return;
        const items = collectInteractives(el);
        if (items.some(i => i.kind === 'answer' || i.kind === 'word')) {
          clearInterval(retry);
          interactives = items;
          lastSlideText = visibleText(el);
          const q = describeQuestion(el);
          if (q.length) speak(q, { interrupt: false });
        }
      }, 700);
    }
  }

  // ----------------------------------------------------- feedback watcher
  // Throttled (not debounced): Genially animations stream style mutations,
  // a resetting timer would never fire during them.
  let feedbackTimer = null;
  let slideChangedAt = 0;
  function watchFeedback() {
    if (feedbackTimer) return;
    feedbackTimer = setTimeout(() => {
      feedbackTimer = null;
      const slideEl = getCurrentSlideEl();
      if (!slideEl || slideEl.id !== currentSlideId) return;
      const now = visibleText(slideEl);
      if (now === lastSlideText) return;
      // Right after a slide change the content is still mounting; the 900ms
      // announceSlide will read it - don't speak the half-mounted diff.
      if (Date.now() - slideChangedAt < 1100) { lastSlideText = now; return; }
      // Find text that was added (simple containment diff).
      let added = '';
      if (now.length > lastSlideText.length) {
        // try to isolate the new fragment
        let i = 0;
        while (i < lastSlideText.length && lastSlideText[i] === now[i]) i++;
        let j = 0;
        while (j < lastSlideText.length - i &&
               lastSlideText[lastSlideText.length - 1 - j] === now[now.length - 1 - j]) j++;
        added = now.slice(i, now.length - j).trim();
      }
      lastSlideText = now;
      if (added && added.length > 2 && added.length < 500) {
        // re-collect (new buttons may have appeared) then speak feedback
        interactives = collectInteractives(slideEl);
        speak([translate(added)]);
      }
    }, 500);
  }

  // ----------------------------------------------------------- observers
  const observer = new MutationObserver(() => {
    const slideEl = getCurrentSlideEl();
    if (!slideEl) return;
    if (slideEl.id !== currentSlideId) {
      currentSlideId = slideEl.id;
      slideChangedAt = Date.now();
      clearTimeout(feedbackTimer);          // drop stale feedback diffs
      feedbackTimer = null;
      lastSlideText = visibleText(slideEl);   // reset diff baseline to new slide
      // wait for the slide content/animations to mount
      setTimeout(() => {
        const el = getCurrentSlideEl();
        if (el && el.id === currentSlideId) announceSlide(el);
      }, 900);
    } else {
      watchFeedback();
    }
  });

  // ------------------------------------------- conversational agent (C key)
  let conversing = false;

  function pageContext() {
    const slide = slidesById[currentSlideId];
    const curated = curatedSlide(currentSlideId);
    const parts = [];
    if (slide) parts.push(`Page ${slide.order}${slide.name ? ' (' + slide.name + ')' : ''}.`);
    if (curated && curated.fr && curated.fr.pre) parts.push(curated.fr.pre);
    if (slide && slide.texts.length) parts.push(slide.texts.join(' '));
    if (slide && slide.activity && slide.activity.question) {
      parts.push('Question : ' + slide.activity.question);
      parts.push('Réponses : ' + slide.activity.answers
        .map(a => a.text + (a.correct ? ' (correcte)' : '')).join(' ; '));
    }
    return parts.join('\n').slice(0, 2000);
  }

  function askClaude(question) {
    const t = T();
    speak([t.thinking], { interrupt: false });
    try {
      chrome.runtime.sendMessage(
        { type: 'pba-ask', question, lang: settings.lang, context: pageContext() },
        resp => {
          conversing = false;
          if (chrome.runtime.lastError || !resp || !resp.ok) {
            log('ask failed:', (resp && resp.error) || (chrome.runtime.lastError || {}).message);
            speak([t.askFailed]);
            return;
          }
          speak([resp.text]);
        });
    } catch (_) { conversing = false; speak([t.askFailed]); }
  }

  async function startConversation() {
    const t = T();
    if (conversing) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { speak([t.askNoMic]); return; }
    conversing = true;
    speak([t.listening]);
    await speechIdle();        // don't let the mic capture our own voice
    if (!conversing) return;
    const rec = new SR();
    rec.lang = settings.lang === 'en' ? 'en-US' : 'fr-FR';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let got = false;
    rec.onresult = e => {
      got = true;
      const q = e.results[0][0].transcript;
      log('heard:', q);
      askClaude(q);
    };
    rec.onaudiostart = () => log('mic open, listening');
    rec.onerror = e => {
      log('recognition error:', e.error);
      conversing = false;
      if (e.error === 'aborted') return;            // cancelled on purpose
      const msg = (e.error === 'not-allowed' || e.error === 'service-not-allowed') ? t.micDenied
        : e.error === 'audio-capture' ? t.micMissing
        : e.error === 'network' ? t.micNetwork
        : t.askHeardNothing;
      speak([msg]);
    };
    rec.onend = () => {
      if (!got) conversing = false;
      if (!speaking && !speechQueue.length) duck(false);   // keep ducked if the guide is answering
    };
    try { duck(true); rec.start(); } catch (_) { conversing = false; duck(false); speak([t.askNoMic]); }
  }

  // ------------------------------------------------------------ keyboard
  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

    if (!hadUserGesture) {
      hadUserGesture = true;
      if (pendingSpeech) {
        const p = pendingSpeech; pendingSpeech = null;
        lastSpoken = '';                         // let the queued text through
        speak(p.segments, { interrupt: p.interrupt });
        return;
      }
    }

    const t = T();
    const key = e.key.toLowerCase();

    if (key >= '1' && key <= '9') {
      let item = interactives[parseInt(key, 10) - 1];
      // Re-collect just in time if the stored element vanished (slide re-render).
      if (!item || !document.contains(item.el)) {
        const el = getCurrentSlideEl();
        if (el) interactives = collectInteractives(el);
        item = interactives[parseInt(key, 10) - 1];
      }
      if (item && document.contains(item.el)) {
        if (item.kind === 'drag') {
          const targets = interactives.filter(i => i.kind === 'target' && document.contains(i.el));
          if (targets.length === 1) {
            speak([...segsOf(item).map(s => s + '.'), t.dropped]);
            setTimeout(() => simulateDrag(item.el, targets[0].el), 300);
          } else if (targets.length > 1 || pendingDrag !== item) {
            pendingDrag = item;
            speak([...segsOf(item).map(s => s + '.'), t.grabbed]);
          }
        } else if (item.kind === 'target' && pendingDrag && document.contains(pendingDrag.el)) {
          const src = pendingDrag; pendingDrag = null;
          speak([...segsOf(src).map(s => s + '.'), t.dropped]);
          setTimeout(() => simulateDrag(src.el, item.el), 300);
        } else {
          speak(segsOf(item).map(s => s + '.'));
          setTimeout(() => simulateClick(item.el), 350);
        }
      } else {
        speak([t.noItem]);
      }
      e.preventDefault(); e.stopPropagation();
      return;
    }

    switch (key) {
      case 'h':
        speak([t.help]); break;
      case 'r': {
        const el = getCurrentSlideEl();
        if (el) announceSlide(el, { repeat: true });
        break;
      }
      case 'd': {
        const curated = curatedSlide(currentSlideId);
        const detail = curated && curated[settings.lang] && curated[settings.lang].detail;
        speak([detail || t.noDetail]);
        break;
      }
      case 'q': {
        const slideEl = getCurrentSlideEl();
        if (slideEl) interactives = collectInteractives(slideEl);
        const q = describeQuestion(slideEl);
        speak(q.length ? q : [t.noQuestion]);
        break;
      }
      case 'l': {
        const slideEl = getCurrentSlideEl();
        if (slideEl) interactives = collectInteractives(slideEl);
        if (!interactives.length) { speak([t.noItem]); break; }
        const segs = [t.listIntro];
        interactives.forEach((it, i) => segs.push(`${i + 1}.`, ...segsOf(it).map(s => s + '.')));
        speak(segs);
        break;
      }
      case 'v': {
        const submit = interactives.find(i => i.kind === 'submit') ||
          interactives.find(i => /v[ée]rif|envoyer|valider|send/i.test(i.label));
        if (submit && document.contains(submit.el)) {
          speak([t.submitted]);
          setTimeout(() => simulateClick(submit.el), 300);
        } else speak([t.noSubmit]);
        break;
      }
      case 'c':
        startConversation(); break;
      case 's':
      case 'escape':
        stopSpeech(); break;
      case 't':
        settings.lang = settings.lang === 'fr' ? 'en' : 'fr';
        saveSettings();
        speak([T().langName]);
        setTimeout(() => { const el = getCurrentSlideEl(); if (el) announceSlide(el); }, 1500);
        break;
      case '+':
      case '=':
        settings.rate = Math.min(2, settings.rate + 0.2);
        saveSettings(); speak([t.rate(settings.rate)]); break;
      case '-':
        settings.rate = Math.max(0.5, settings.rate - 0.2);
        saveSettings(); speak([t.rate(settings.rate)]); break;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
  }

  // ------------------------------------------------------------ settings
  function saveSettings() {
    try { chrome.storage.sync.set({ pba: settings }); } catch (_) {}
  }

  function loadSettings() {
    return new Promise(resolve => {
      try {
        chrome.storage.sync.get('pba', data => {
          if (data && data.pba) Object.assign(settings, data.pba);
          resolve();
        });
      } catch (_) { resolve(); }
    });
  }

  try {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync' && changes.pba) {
        const before = settings.enabled;
        Object.assign(settings, changes.pba.newValue || {});
        if (!settings.enabled) stopSpeech();
        else if (!before && settings.enabled) {
          const el = getCurrentSlideEl();
          if (el) announceSlide(el);
        }
      }
    });
    chrome.runtime.onMessage.addListener((msg, _s, sendResponse) => {
      if (msg && msg.type === 'pba-status') {
        sendResponse({ active: true, lang: settings.lang, enabled: settings.enabled, rate: settings.rate });
      }
      return false;
    });
  } catch (_) {}

  // Request the mic once at startup so the C key works without a permission
  // popup mid-game. The grant persists for the site; if the state is already
  // granted or denied this is a no-op.
  async function preGrantMic() {
    try {
      const st = await navigator.permissions.query({ name: 'microphone' });
      if (st.state !== 'prompt') return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
    } catch (_) {}
  }

  // --------------------------------------------------------------- boot
  async function boot() {
    await loadSettings();
    await loadModel();
    if (settings.enabled) preGrantMic();

    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ['style', 'class']
    });
    window.addEventListener('keydown', onKey, true);
    const gesture = () => {
      if (!hadUserGesture) {
        hadUserGesture = true;
        if (pendingSpeech) {
          const p = pendingSpeech; pendingSpeech = null;
          lastSpoken = '';
          speak(p.segments, { interrupt: p.interrupt });
        }
      }
    };
    window.addEventListener('pointerdown', gesture, true);
    window.addEventListener('keydown', gesture, true);

    // initial slide
    const wait = setInterval(() => {
      const el = getCurrentSlideEl();
      if (el) {
        clearInterval(wait);
        currentSlideId = el.id;
        const title = CURATED && CURATED.title
          ? (CURATED.title[settings.lang] || CURATED.title.fr)
          : (model ? model.title : document.title);
        interactives = collectInteractives(el);
        lastSlideText = visibleText(el);
        const segs = [T().welcome, PAUSE, title];
        if (el.id !== lastAnnouncedId) {   // observer may have announced it already
          lastAnnouncedId = el.id; lastAnnouncedAt = Date.now();
          lastAnnouncement = composeAnnouncement(el);
          segs.push(PAUSE, ...lastAnnouncement);
        }
        speak(segs);
      }
    }, 500);
    setTimeout(() => clearInterval(wait), 30000);
    log('boot ok', GENIALLY_ID, model ? `${model.slides.length} slides` : 'no model',
      Object.keys(AUDIO_MAP).length + ' audio segments');
  }

  boot();
})();
