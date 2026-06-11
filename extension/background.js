// Service worker: relays the player's spoken questions (key C) to Claude
// and returns a short child-friendly answer to be read aloud.
//
// Default path: the public PBA relay (pba.lekibbitz.fr), which holds the
// API key server-side - the extension works for everyone with zero setup.
// Optional: a personal API key stored in chrome.storage.sync ('pbaKey')
// via the popup switches to a direct Anthropic call.

const RELAY_URL = 'https://pba.lekibbitz.fr/ask';

const RULES = `Petit Bridge ("Luna et le grimoire des cartes", Fédération Française de Bridge) : jeu de cartes pédagogique pour enfants.
- 40 cartes, 4 familles de couleurs (bleu, vert, jaune, rouge), valeurs de 1 à 10 ; le 10 est la carte la plus forte. Chaque carte porte un animal ou un objet (exemple : le 6 vert est un paquebot).
- 4 joueurs assis Nord, Sud, Est, Ouest autour d'un tapis. On joue 2 contre 2 : Nord avec Sud, Est avec Ouest ; les partenaires se font face. Chaque joueur reçoit 10 cartes.
- Une levée (un pli) = 4 cartes, une par joueur, posées au centre. Il faut jouer la couleur demandée si on en a ; sinon on défausse une autre couleur. La carte la plus forte de la couleur demandée gagne la levée, et celui qui gagne rejoue en premier.
- Stratégie de base : ne pas gaspiller ses cartes fortes, observer les cartes jouées, jouer en équipe avec son partenaire.
- Dans le jeu Genially, l'enfant aide la magicienne Luna à réussir 4 leçons (forêt, grotte, salle des duos, bibliothèque) en répondant à des questions pour gagner des potions magiques.`;

async function handleAsk(msg) {
  const { pbaKey } = await chrome.storage.sync.get('pbaKey');
  if (!pbaKey) return askViaRelay(msg);
  return askDirect(msg, pbaKey);
}

async function askViaRelay(msg) {
  const res = await fetch(RELAY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ question: msg.question, context: msg.context, lang: msg.lang })
  });
  if (!res.ok) throw new Error('relay-' + res.status);
  const data = await res.json();
  if (!data.ok || !data.text) throw new Error(data.error || 'relay-empty');
  return data.text;
}

async function askDirect(msg, pbaKey) {
  const lang = msg.lang === 'en' ? 'English' : 'French';
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': pbaKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: `You are the friendly spoken companion of a blind child who is playing the educational card game Petit Bridge in a web game. Answer in ${lang}, in 1 to 3 short, warm, simple sentences meant to be read aloud by a speech synthesizer to a child. No formatting, no lists, no emojis. You may guide toward the answer of the current exercise, and give it if the child asks for it.

Game rules:
${RULES}

Current page context:
${msg.context || '(unknown)'}`,
      messages: [{ role: 'user', content: msg.question }]
    })
  });
  if (!res.ok) throw new Error('api-' + res.status);
  const data = await res.json();
  return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join(' ').trim();
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === 'pba-ask') {
    handleAsk(msg)
      .then(text => sendResponse({ ok: true, text }))
      .catch(e => sendResponse({ ok: false, error: String((e && e.message) || e) }));
    return true; // async response
  }
  return false;
});
