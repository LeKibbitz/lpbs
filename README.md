# Petit Bridge Audio Guide

Extension Chrome d'accessibilité pour non-voyants : elle décrit oralement chaque
page du jeu Genially **« Luna et le grimoire des cartes »** (découverte du Petit
Bridge) avec une **voix neurale naturelle**, rend tout le jeu jouable au
clavier — quiz, textes à trous, glisser-déposer de cartes — et peut répondre
aux questions de l'enfant en mode conversation (touche `C`, via l'API Claude).

Jeu : https://view.genially.com/697f6a08ef130744478db916

## Installation (2 minutes)

1. Ouvre Chrome et va sur `chrome://extensions`
2. Active le **Mode développeur** (interrupteur en haut à droite)
3. Clique **« Charger l'extension non empaquetée »**
4. Sélectionne le dossier `extension/` de ce projet
5. Va sur https://view.genially.com/697f6a08ef130744478db916
6. **Appuie sur une touche (par exemple `H`)** : la voix démarre
   (Chrome exige un premier geste de l'utilisateur avant d'autoriser le son)

Aucune compilation, aucun compte. La voix principale est **préenregistrée**
(637 fichiers audio neuraux embarqués, hors-ligne) ; seule l'option
conversation (touche `C`) demande une clé API Claude, à saisir dans le popup.

## Raccourcis clavier

| Touche | Action |
|--------|--------|
| `H` | Aide vocale (liste des raccourcis) |
| `R` | Répéter la description de la page |
| `Q` | Lire la question et les réponses possibles |
| `1`-`9` | Choisir une réponse / activer un bouton / poser une carte |
| `L` | Liste numérotée des éléments interactifs de la page |
| `V` | Valider l'exercice (Envoyer / Vérification) |
| `C` | Poser une question à voix haute — le guide répond (API Claude) |
| `S` ou `Échap` | Couper la voix |
| `T` | Basculer français ↔ anglais |
| `+` / `-` | Vitesse de la voix |

Le popup de l'extension (icône violette) permet aussi de couper la voix,
changer la langue, régler la vitesse et enregistrer la clé API Claude.

## La voix

- **Voix neurale préenregistrée** : toutes les phrases connues à l'avance
  (descriptions des 34 pages, questions, réponses, feedbacks, noms des 49
  cartes, aide…) sont des MP3 générés avec les voix neurales Microsoft Edge
  (`fr-FR-Vivienne`, `en-US-Ava`) et embarqués dans l'extension. Lecture
  hors-ligne, vitesse réglable sans changement de hauteur.
- **Respiration** : les annonces sont découpées en segments (description,
  question, réponses numérotées…) séparés par de courtes pauses, au lieu d'un
  bloc enchaîné.
- **Fallback** : un texte imprévu (très rare) est lu par la synthèse du
  navigateur, en privilégiant les voix naturelles disponibles.
- **Son du jeu** : les sons natifs du Genially restent actifs ; leur volume
  est automatiquement baissé pendant que le guide parle, puis restauré
  (ducking).

## Mode conversation (touche `C`)

L'enfant appuie sur `C`, pose sa question à voix haute (micro), et le guide
répond en 1 à 3 phrases adaptées à un enfant — règles du Petit Bridge et
contexte de la page courante inclus dans la requête. Nécessite une clé API
Claude (popup de l'extension) et une connexion internet ; la clé reste dans
le stockage du navigateur et ne part que vers `api.anthropic.com`.

## Ce que l'extension sait faire

- **Annonce automatique de chaque page** : numéro de page, description du décor
  (rédigée à la main pour les 34 pages du jeu, y compris les illustrations),
  textes de la leçon, question et réponses numérotées.
- **Quiz** : réponses numérotées dans l'ordre affiché ; touche chiffrée pour
  répondre ; le feedback (« Bravo ! », indices en cas d'erreur) est lu.
- **Textes à trous** : les mots de la banque sont numérotés ; chaque appui place
  le mot dans le prochain trou libre ; `V` valide.
- **Glisser-déposer de cartes** (leçons 2 et 4) : chaque carte est annoncée par
  son nom réel (« le 6 vert, paquebot ») ; un chiffre fait glisser la carte sur
  la table ; `V` déclenche la vérification ; la règle révélée est lue.
- **Choix d'images** : les réponses-images sont décrites (« le 2 bleu, souris »).
- **Fenêtres de règles** : les popups de règles sont détectés et lus.
- **Bilingue** : descriptions FR natives + narration EN complète (touche `T`),
  audio neural dans les deux langues.
- **Générique** : sur n'importe quel autre Genially public, l'extension lit le
  contenu des pages via l'API Genially (voix de synthèse, sans descriptions
  visuelles).

## Architecture

```
extension/
├── manifest.json     # MV3, content script + service worker
├── content.js        # cœur : détection de slide (MutationObserver), file de
│                     # segments audio (MP3 neural ou synthèse), clavier,
│                     # drag&drop simulé, ducking, mode conversation
├── background.js     # service worker : relai des questions vers l'API Claude
├── strings.js        # phrases du guide FR/EN (source unique runtime + build)
├── descriptions.js   # descriptions FR/EN rédigées par page + labels
├── gamedata.js       # contenu du jeu embarqué (généré)
├── cards.js          # image de carte -> nom parlé (généré)
├── audio-map.js      # "<langue>|<phrase>" -> fichier MP3 (généré)
├── audio/            # 637 MP3 neuraux préenregistrés (~16 Mo, générés)
├── popup.html/js     # réglages (on/off, langue, vitesse, clé API Claude)
└── icons/

tools/
├── build_gamedata.py        # régénère gamedata.js depuis l'API Genially
├── extract_segments.mjs     # énumère toutes les phrases prononçables
├── build_audio.py           # génère les MP3 (edge-tts) + audio-map.js
├── test_extension.py        # test E2E basique (9 checks)
└── test_extension_deep.py   # test E2E complet : leçon 1 entière + dnd (13 checks)
```

Régénérer l'audio après modification des textes :

```bash
node tools/extract_segments.mjs
uv run --with edge-tts python3 tools/build_audio.py
```

Points techniques notables :

- Le moteur vocal est une **file de segments** : chaque segment est joué depuis
  son MP3 préenregistré si la phrase exacte est connue (clé normalisée
  `langue|texte`), sinon par `speechSynthesis` phrase par phrase ; pauses de
  280 ms entre segments, 550 ms entre blocs.
- La slide courante est `div.genially-view-slide[id=<uuid>]` ; un
  MutationObserver (childList + attributs `style`/`class`) détecte les
  changements de page **et** les éléments révélés par le jeu (badges de règles).
- Le feedback est détecté par diff du texte **visible** (`innerText`) de la
  slide, throttlé à 500 ms, et muet pendant 1,1 s après un changement de page
  (contenu en cours de montage).
- Le glisser-déposer du jeu est un script S'CAPE « DNDoo » embarqué : la
  validation compare `style.left/top` des calques. L'extension simule un drag
  pointer complet (pointerdown → moves → pointerup), accepté par Genially
  même en événements non-trusted.
- Chrome bloque l'audio avant le premier geste utilisateur : la première
  annonce est mise en attente (et cumulée) jusqu'au premier appui de touche.

## Tests

```bash
uv run --with playwright python3 tools/test_extension.py        # 9/9
uv run --with playwright python3 tools/test_extension_deep.py   # 13/13
```

Les tests chargent l'extension dans un Chromium Playwright et suivent le
parcours réel d'un utilisateur non-voyant (écoute des annonces → appui des
numéros annoncés). L'appel API du mode conversation est validé séparément
(requête identique à celle du service worker).

## Limites connues

- Page 24 (« Trouve l'ordre des cartes ») : exercice d'ordre complexe, jouable
  par essai-erreur (le jeu annonce les erreurs et on peut recommencer).
- La reconnaissance vocale (touche `C`) utilise le service de Google intégré à
  Chrome : elle fonctionne dans Chrome de bureau, pas dans Chromium nu.
- Un texte dynamique imprévu est lu par la synthèse du navigateur (voix
  différente de la voix neurale principale).
- L'extension cible Chrome/Chromium/Edge (Manifest V3).
