// Enumerates every sentence the extension can speak from static data
// (UI strings, page descriptions, game texts, answers, feedbacks, labels,
// card names) so tools/build_audio.py can pre-generate neural audio for
// them. Each game has its own narrator voice profile.
// Output: .tmp/segments.json = [{game, profile, lang, text}, ...]
import fs from 'fs';
import path from 'path';
import url from 'url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const window = {};
for (const f of ['descriptions.js', 'gamedata.js', 'cards.js', 'strings.js']) {
  // eval is safe here: build-time script loading our own extension data
  // files from this repo (they only assign window.PBA_* literals).
  eval(fs.readFileSync(path.join(ROOT, 'extension', f), 'utf8'));
}

// profile 'f' = female narrator (episode 1), 'm' = male narrator (episode 2)
const GAMES = [
  { id: '697f6a08ef130744478db916', profile: 'f', cards: true },
  { id: '6999b0b9d1e83ea5a328b462', profile: 'm', cards: false },
];

const C = window.PBA_CARDS;
const S = window.PBA_STRINGS;

const out = [];
// Same normalization as content.js audioFileFor(): collapsed whitespace,
// no trailing period.
const norm = s => s.replace(/\s+/g, ' ').trim().replace(/\.+$/, '');

for (const game of GAMES) {
  const D = window.PBA_DESCRIPTIONS[game.id];
  const G = window.PBA_GAMES[game.id];
  const add = (lang, s) => {
    if (typeof s !== 'string') return;
    const n = norm(s);
    if (n) out.push({ game: game.id, profile: game.profile, lang, text: n });
  };

  const tr = (D && D.translate) || {};
  const toEn = s => tr[s] || tr[s.trim()] || s;

  for (const lang of ['fr', 'en']) {
    const t = S[lang];
    for (const k of Object.keys(t)) if (typeof t[k] === 'string') add(lang, t[k]);
    for (let n = 1; n <= 12; n++) add(lang, t.items(n));
    for (let n = 1; n <= 9; n++) {
      add(lang, t.interactiveItem(n));
      add(lang, t.dragObj(n));
      add(lang, t.dropZone(n));
      add(lang, `${n}.`);
    }
    for (let r = 5; r <= 20; r++) add(lang, t.rate(r / 10));
    if (D) add(lang, D.title[lang]);
    for (const id of Object.keys((D && D.labels) || {})) {
      const l = D.labels[id];
      add(lang, l[lang] || l.fr);
    }
    if (game.cards) for (const k of Object.keys(C)) add(lang, C[k][lang] || C[k].fr);
  }
  add('fr', 'Vérification');
  add('en', 'Verification');
  add('fr', 'Envoyer');     // Genially's blanks submit button ("Send")
  add('en', 'Send');

  for (const sl of (G ? G.slides : [])) {
    for (const txt of sl.texts || []) { add('fr', txt); add('en', toEn(txt)); }
    const cur = D && D.slides ? D.slides[sl.id] : null;
    if (cur) {
      if (cur.fr && cur.fr.pre) add('fr', cur.fr.pre);
      if (cur.fr && cur.fr.detail) add('fr', cur.fr.detail);
      if (cur.en && cur.en.full) add('en', cur.en.full);
      if (cur.en && cur.en.detail) add('en', cur.en.detail);
    }
    const a = sl.activity;
    if (a) {
      if (a.question) {
        add('fr', `${S.fr.question} ${a.question}`);
        add('en', `${S.en.question} ${toEn(a.question)}`);
      }
      for (const ans of a.answers || []) { add('fr', ans.text); add('en', toEn(ans.text)); }
      if (a.blanks) {
        add('fr', a.blanks.replace(/___/g, 'trou'));
        add('en', a.blanks.replace(/___/g, 'blank'));
      }
      for (const f of [a.feedbackOk, a.feedbackKo]) {
        if (f) { add('fr', f); add('en', toEn(f)); }
      }
    }
  }
  // translate dictionary: FR keys are spoken in FR mode (feedback diffs),
  // EN values in EN mode.
  for (const k of Object.keys(tr)) { add('fr', k); add('en', tr[k]); }
}

const seen = new Set();
const uniq = out.filter(o => {
  const k = o.game + '|' + o.lang + '|' + o.text;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});
fs.mkdirSync(path.join(ROOT, '.tmp'), { recursive: true });
fs.writeFileSync(path.join(ROOT, '.tmp', 'segments.json'), JSON.stringify(uniq, null, 1));
console.log(uniq.length, 'segments',
  GAMES.map(g => `${g.id.slice(0, 6)}:${uniq.filter(o => o.game === g.id).length}`).join(', '));
