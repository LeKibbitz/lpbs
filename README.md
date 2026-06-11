# Bridge Audio Guide — jeux Petit Bridge & Mini Bridge accessibles aux aveugles

Extension Chrome d'accessibilité : elle décrit oralement chaque page des jeux
pédagogiques Genially de la Fédération Française de Bridge avec une **voix
neurale naturelle**, rend tout le jeu jouable au **clavier** — quiz, textes à
trous, glisser-déposer de cartes — et répond aux questions de l'enfant à la
voix (touche `C`), sans aucun compte ni clé.

Jeux pris en charge nativement :

| Épisode | Jeu | Voix |
|---|---|---|
| 1 | [Luna et le grimoire des cartes](https://view.genially.com/697f6a08ef130744478db916) (Petit Bridge) | Denise (FR) / Ava (EN) |
| 2 | [Mission BridgeBot : le protocole Mini Bridge](https://view.genially.com/6999b0b9d1e83ea5a328b462) | Henri (FR) / Andrew (EN) |

Sur n'importe quel autre Genially public, l'extension lit le contenu des pages
via l'API Genially (voix de synthèse, sans descriptions visuelles rédigées).

## Installation (2 minutes)

1. Télécharge ce dépôt : bouton vert **Code → Download ZIP**, puis dézippe
   (ou `git clone https://github.com/LeKibbitz/lpbs.git`)
2. Ouvre Chrome et va sur `chrome://extensions`
3. Active le **Mode développeur** (interrupteur en haut à droite)
4. Clique **« Charger l'extension non empaquetée »**
5. Sélectionne le dossier `extension/` du projet
6. Ouvre un des deux jeux (liens ci-dessus)
7. **Appuie sur `H`** (aide) **ou `S`** (silence) : la voix démarre — Chrome
   exige un premier geste avant d'autoriser le son. `H` explique ensuite tout
   le mode d'emploi à voix haute.

Aucune compilation, aucun compte. La voix est **préenregistrée et embarquée**
(plus de 1 250 fichiers audio neuraux, lecture hors-ligne).

## Raccourcis clavier

| Touche | Action |
|--------|--------|
| `H` | Aide vocale : le mode d'emploi complet, à voix haute |
| `L` | Liste numérotée des boutons de la page |
| `1`-`9` | Activer le bouton / la réponse de ce numéro / poser une carte |
| `R` | Répéter la description de la page |
| `Q` | Lire la question et les réponses possibles |
| `V` | Valider l'exercice (Envoyer / Vérification) |
| `D` | Audiodescription du décor de la page |
| `C` | Poser une question à voix haute — le guide répond |
| `S` ou `Échap` | Couper la voix |
| `T` | Basculer français ↔ anglais |
| `+` / `-` | Vitesse de la voix |

Le popup de l'extension (icône violette) permet aussi de couper la voix,
changer la langue, régler la vitesse et activer l'audiodescription permanente
des décors.

## La voix

- **Voix neurale préenregistrée** : toutes les phrases connues à l'avance
  (descriptions de chaque page, questions, réponses, feedbacks, noms des
  cartes, règles, aide…) sont des MP3 générés avec les voix neurales Microsoft
  Edge et embarqués. Chaque épisode a son narrateur : voix féminine pour Luna,
  voix masculine pour BridgeBot. Lecture hors-ligne, vitesse réglable.
- **Respiration** : les annonces sont découpées en segments (description,
  question, réponses numérotées…) séparés par de courtes pauses.
- **Audiodescription** : les décors de chaque page (château, forêt enchantée,
  vaisseau spatial…) sont décrits à la demande (`D`) ou automatiquement
  (option du popup) — descriptions rédigées à partir des illustrations.
- **Fallback** : un texte imprévu (rare) est lu par la synthèse du navigateur.
- **Son du jeu** : les sons natifs du Genially restent actifs ; leur volume est
  baissé pendant que le guide parle ou écoute, puis restauré (ducking).

## Mode conversation (touche `C`)

L'enfant appuie sur `C`, pose sa question à voix haute, et le guide répond en
1 à 3 phrases adaptées à un enfant — règles du jeu et contexte de la page
courante inclus. Les questions passent par le relais public du guide
(`pba.lekibbitz.fr`, propulsé par l'API Claude) : **aucune clé, aucun compte,
aucune configuration**. La permission micro est demandée une seule fois, au
chargement du jeu.

## Ce que l'extension sait faire

- **Annonce automatique de chaque page** : description rédigée à la main,
  textes de la leçon, question et réponses numérotées.
- **Quiz** : réponses numérotées dans l'ordre affiché ; le feedback
  (« Bravo ! », indices) est lu.
- **Textes à trous** : mots numérotés ; chaque appui remplit le prochain trou ;
  `V` valide.
- **Glisser-déposer de cartes** : chaque carte est annoncée par son nom réel
  (« le 6 vert, paquebot ») ; un chiffre la pose sur la table ; `V` vérifie.
- **Boutons explicites** : « Continuer, page suivante », « Lire la règle 3 »,
  « Quitter le jeu »… générés depuis le graphe d'interactivité du Genially.
- **Fenêtres de règles** : détectées et lues.
- **Bilingue** : FR natif + narration EN complète (touche `T`), audio neural
  dans les deux langues, pour les deux épisodes.

## Architecture

```
extension/
├── manifest.json     # MV3, content script + service worker
├── content.js        # cœur : détection de slide (MutationObserver), file de
│                     # segments audio (MP3 neural ou synthèse), clavier,
│                     # drag&drop simulé, ducking, mode conversation
├── background.js     # service worker : relai des questions vers Claude
├── strings.js        # phrases du guide FR/EN (source unique runtime + build)
├── descriptions.js   # descriptions + audiodescriptions FR/EN par page,
│                     # labels des boutons, traductions (par jeu)
├── gamedata.js       # contenu des jeux embarqué (généré, par jeu)
├── cards.js          # image de carte -> nom parlé (généré, épisode 1)
├── audio-map.js      # jeu -> "<langue>|<phrase>" -> MP3 (généré)
├── audio/            # 1 250+ MP3 neuraux préenregistrés (~41 Mo, générés)
├── popup.html/js     # réglages (on/off, langue, vitesse, audiodescription)
└── icons/

tools/
├── build_gamedata.py        # régénère gamedata.js depuis l'API Genially
├── extract_segments.mjs     # énumère toutes les phrases prononçables
├── build_audio.py           # génère les MP3 (edge-tts) + audio-map.js
├── test_extension.py        # test E2E basique (9 checks)
└── test_extension_deep.py   # test E2E complet : leçon 1 entière + dnd (13 checks)

vps/pba-relay/               # relais Claude de la touche C (FastAPI, Docker)
```

Régénérer l'audio après modification des textes :

```bash
node tools/extract_segments.mjs
uv run --with edge-tts python3 tools/build_audio.py
```

Points techniques notables :

- Le moteur vocal est une **file de segments** : chaque segment est joué depuis
  son MP3 préenregistré si la phrase exacte est connue (clé normalisée
  `langue|texte`, par jeu), sinon par `speechSynthesis` ; pauses de 280 ms
  entre segments, 550 ms entre blocs.
- Les voix françaises sont des voix **mono-langues** (pas de voix
  *Multilingual*) : les voix multilingues détectent la langue par segment et
  lisent les libellés courts avec un accent anglais.
- La slide courante est `div.genially-view-slide[id=<uuid>]` ; un
  MutationObserver détecte les changements de page **et** les éléments révélés
  par le jeu.
- Le feedback est détecté par diff du texte **visible** de la slide.
- L'extension simule un drag pointer complet (pointerdown → moves → pointerup),
  accepté par le moteur de drag&drop du Genially.
- Chrome bloque l'audio avant le premier geste utilisateur : la première
  annonce est mise en attente jusqu'au premier appui de touche (d'où le
  démarrage par `H` ou `S`).

## Tests

```bash
uv run --with playwright python3 tools/test_extension.py        # 9/9
uv run --with playwright python3 tools/test_extension_deep.py   # 13/13
```

Les tests chargent l'extension dans un Chromium Playwright et suivent le
parcours réel d'un utilisateur non-voyant (écoute des annonces → appui des
numéros annoncés).

## Limites connues

- Épisode 2 : les exercices de jeu à la carte (missions 2 à 5) utilisent des
  images de cartes pas encore toutes nommées — identification en cours.
- La reconnaissance vocale (touche `C`) utilise le service de Google intégré à
  Chrome : elle fonctionne dans Chrome de bureau, pas dans Chromium nu.
- L'extension cible Chrome/Chromium/Edge (Manifest V3).

## Genèse

Ce projet est né de la rencontre de joueurs de bridge aveugles lors du festival
de Deauville et des championnats de France à Strasbourg — tables adaptées,
étuis braillés, et l'envie de rendre l'apprentissage du bridge accessible dès
le premier contact, pour les enfants comme pour les adultes.

Réalisé avec [Claude Code](https://claude.com/claude-code). Licence MIT.
