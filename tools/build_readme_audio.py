#!/usr/bin/env python3
"""Generates the audio README (FR + EN) at the repo root: a spoken guide to
installing and using the extension, with the same neural voices as the guide.

Usage:
    uv run --with edge-tts python3 tools/build_readme_audio.py
"""
import asyncio
import pathlib

import edge_tts

ROOT = pathlib.Path(__file__).resolve().parent.parent

FR = """
Bonjour ! Voici le guide audio du Petit Bridge, une extension Chrome pensée
pour les joueuses et joueurs non-voyants. Elle décrit à voix haute chaque page
des jeux « Luna et le grimoire des cartes » et « Mission BridgeBot », et rend
tout le jeu jouable au clavier : les quiz, les textes à trous, et même la pose
des cartes sur la table.

Pour l'installer, demande si besoin l'aide d'une personne voyante, c'est
l'affaire de deux minutes.
Étape 1 : télécharge le projet depuis la page GitHub, avec le bouton Code,
puis Télécharger le ZIP, et décompresse-le.
Étape 2 : dans Chrome, ouvre l'adresse chrome://extensions.
Étape 3 : active le Mode développeur, l'interrupteur en haut à droite.
Étape 4 : clique sur « Charger l'extension non empaquetée », et choisis le
dossier nommé « extension » dans le projet décompressé.
C'est installé !

Pour jouer, ouvre le lien du jeu donné dans le README, puis appuie sur
n'importe quelle touche : la voix démarre. Chrome demande ce premier geste
avant d'autoriser le son.

Les touches à connaître.
H : l'aide.
L : la liste numérotée des boutons de la page.
Les chiffres de 1 à 9 : activer un bouton, choisir une réponse, ou poser une
carte.
R : répéter la page. Q : relire la question. V : valider l'exercice.
D : la description du décor.
C : poser une question à voix haute ; le guide te répond. Aucune clé ni compte
n'est nécessaire.
S ou Échap : silence. T : passer en anglais ou revenir en français.
Plus et moins : la vitesse de la voix.

Bon voyage avec Luna, et bonne découverte du Petit Bridge !
"""

EN = """
Hello! This is the audio guide for Petit Bridge, a Chrome extension designed
for blind players. It reads every page of the games "Luna and the Grimoire of
Cards" and "Mission BridgeBot" aloud, and makes the whole game playable with
the keyboard: the quizzes, the fill-in-the-blanks, and even placing cards on
the table.

To install it, ask a sighted person for help if needed; it takes two minutes.
Step 1: download the project from the GitHub page, with the Code button, then
Download ZIP, and unzip it.
Step 2: in Chrome, open the address chrome://extensions.
Step 3: turn on Developer mode, the switch at the top right.
Step 4: click "Load unpacked", and pick the folder named "extension" inside
the unzipped project.
That's it!

To play, open the game link given in the README, then press any key: the
voice starts. Chrome requires this first gesture before allowing sound.

The keys to know.
H: help.
L: the numbered list of buttons on the page.
Numbers 1 to 9: press a button, pick an answer, or place a card.
R: repeat the page. Q: read the question again. V: submit the exercise.
D: the scenery description.
C: ask a question out loud; the guide answers you. No key or account needed.
S or Escape: silence. T: switch to French or back to English.
Plus and minus: the speech rate.

Enjoy the journey with Luna, and have fun discovering Petit Bridge!
"""


async def main():
    for name, text, voice in [
        ("README-audio-fr.mp3", FR, "fr-FR-DeniseNeural"),
        ("README-audio-en.mp3", EN, "en-US-AvaMultilingualNeural"),
    ]:
        out = ROOT / name
        await edge_tts.Communicate(" ".join(text.split()), voice).save(str(out))
        print(name, f"{out.stat().st_size / 1e6:.1f} MB")


asyncio.run(main())
