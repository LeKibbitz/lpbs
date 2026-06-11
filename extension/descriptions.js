// Hand-authored accessibility layer for "Luna et le grimoire des cartes"
// (Petit Bridge discovery game). Keyed by Genially ID, then slide UUID.
// - fr.pre : visual/context preamble spoken BEFORE the slide's own texts
// - en.full: complete English narration spoken INSTEAD of the French texts
// - labels : spoken names for clickable elements (element UUID -> label)
// - translate: exact-match French -> English strings for DOM-read content
//   (quiz questions, answers, feedback) when language is set to English.

window.PBA_DESCRIPTIONS = {
  "697f6a08ef130744478db916": {
    title: {
      fr: "Luna et le grimoire des cartes. À la découverte du Petit Bridge.",
      en: "Luna and the Grimoire of Cards. Discovering Petit Bridge."
    },

    slides: {
      // 1 — COVER
      "25be3f38-4674-42cb-9655-b9f3a6fb3cea": {
        fr: { pre: "Page de couverture. Illustration : quatre enfants magiciens et un chat noir marchent vers une école de magie, un château enchanté entouré de cascades et de lanternes. Luna porte un grand chapeau violet et une baguette magique." },
        en: { full: "Cover page. Luna and the Grimoire of Cards: discovering Petit Bridge. Illustration: four young wizards and a black cat walk toward a magic school, an enchanted castle surrounded by waterfalls and lanterns. Luna wears a big purple hat and holds a magic wand. Press 1 to start the game." }
      },
      // 2 — MENU
      "75f3916a-294d-4169-8f49-e58c0507c8bd": {
        fr: { pre: "Le grimoire des cartes, un grand livre magique, est ouvert devant toi." },
        en: { full: "The Grimoire of Cards, a big magic book, lies open in front of you. At the school of Magic, Luna opens the grimoire of Petit Bridge cards. To complete it, she must pass 4 lessons. At each step, Luna will win magic potions. When all potions are gathered, she will have solved the mystery of Petit Bridge. Press 1 to continue." }
      },
      // 3 — MENU 1
      "2fe009a2-dc3e-41d3-9e23-4413934cfdb4": {
        fr: { pre: "Leçon 1 : la Forêt des Premiers Pas. Illustration : une forêt enchantée." },
        en: { full: "Lesson 1: the Forest of First Steps. This first lesson takes Luna into an enchanted forest. She must answer questions to discover the cards, the players, and learn to play with a partner. If Luna passes all the trials of the forest, she earns the Foundations Potion. Are you ready to help her? Press 1 to begin." }
      },
      // 4 — 1.1 quiz families
      "75b307ab-cec5-4c6a-ac2f-397a5b9c22ab": {
        fr: { pre: "Dans la forêt, Luna et son chat noir te montrent un panneau avec les 40 cartes du jeu, rangées en 4 rangées de couleurs : bleu, vert, jaune et rouge. Chaque rangée va de 1 à 10, et chaque carte porte un animal." },
        en: { full: "In the forest, Luna and her black cat show you a board with the 40 cards of the game, arranged in 4 colored rows: blue, green, yellow and red. Each row goes from 1 to 10, and each card shows an animal. Here are the cards of the Petit Bridge game." }
      },
      // 5 — 1.2 quiz strongest card
      "551f03f3-bd02-4386-a734-26c2fc9fea5e": {
        fr: { pre: "Une rangée de cartes est affichée, de la plus faible à gauche à la plus forte à droite." },
        en: { full: "A row of cards is displayed, from the weakest on the left to the strongest on the right. The cards are arranged in ascending order, from weakest to strongest." }
      },
      // 6 — 1.3 quiz partner
      "412011e6-82c8-4ec9-93bf-a955dc92d170": {
        fr: { pre: "L'image montre un tapis de jeu carré vu de dessus, avec quatre joueurs placés aux points cardinaux : Nord en haut, Sud en bas, Ouest à gauche, Est à droite." },
        en: { full: "The picture shows a square game mat seen from above, with four players at the compass points: North at the top, South at the bottom, West on the left, East on the right. In bridge, you play two against two. Partners sit facing each other around the mat." }
      },
      // 7 — 1.4 fill in the blanks
      "13eed9f3-c1c2-4e60-a09f-801f26b88141": {
        fr: { pre: "Exercice : un texte à trous. Choisis les mots avec les touches chiffrées pour remplir les trous dans l'ordre, puis appuie sur V pour valider. Le texte à compléter est le suivant." },
        en: { full: "Exercise: fill in the blanks. Press the number keys to pick words that fill the gaps in order, then press V to submit. The text reads: Luna has almost finished the trials of the Forest of First Steps. She now knows that in Petit Bridge there are, blank, cards in total. All the cards are dealt one by one to the 4 players. Each player receives, blank, cards. Petit Bridge is a game of, blank. You never play alone: you play with a, blank. Around the mat, the players sit North, South, West and, blank. The partner of East sits, blank. The words to place are read as numbered options." }
      },
      // 8 — CORRECT 1
      "7ba0dff2-a163-4d1e-be21-f14708169bad": {
        fr: { pre: "Victoire ! Une fiole de potion magique scintille à l'écran." },
        en: { full: "Victory! A vial of magic potion sparkles on screen. Well done! You discovered the material needed to play Petit Bridge. You helped Luna collect the Foundations Potion. Press 1 to continue." }
      },
      // 9 — MENU 2
      "c78e738d-13ea-4403-b39f-b5aa21e14891": {
        fr: { pre: "Leçon 2 : la Grotte des Jeux Secrets. Illustration : une grotte mystérieuse." },
        en: { full: "Lesson 2: the Cave of Secret Games. This mysterious cave teaches Luna how to play a card, how to win a trick, and what to do when she does not have the requested color. If she passes all the trials, she earns the Tricks Potion. Press 1 to begin." }
      },
      // 10 — 2.1 play a green card
      "22c81fcd-2d61-4730-a7c2-25ec0b84953a": {
        fr: { pre: "Exercice sur table de jeu. Au centre, le tapis avec les quatre joueurs. En bas, le jeu de Luna, en Sud. Une seule carte est cliquable : une carte verte du jeu de Luna. Appuie sur le chiffre annoncé pour la poser, écoute la règle, puis continue." },
        en: { full: "Table exercise. The mat is in the middle with the four players, and Luna's hand is at the bottom, sitting South. West dealt the cards, leads, and plays a green 7. All other players must play a green card. Among Luna's green cards, pick one and play it: only the correct green card is clickable. Press the announced number key to play it, listen to the rule, then continue." }
      },
      // 11 — 2.2 who won the trick
      "5968dea4-b0a6-4f89-80fb-c5b0faa48f3b": {
        fr: { pre: "Sur le tapis, chaque joueur a posé une carte jaune. Écoute bien : qui a la plus forte ?" },
        en: { full: "On the mat, each player has played a yellow card. A yellow card was led first, and every player followed with a yellow card from their hand. Listen carefully: who played the strongest card?" }
      },
      // 12 — 2.3 discard
      "79a07f39-4f31-4642-bdff-5d22879978b3": {
        fr: { pre: "Exercice sur table de jeu. Une seule carte du jeu de Luna est cliquable : la bonne carte à se défausser. Appuie sur le chiffre annoncé pour la poser." },
        en: { full: "Table exercise. North won the trick with the yellow 8 and leads again with a red 2. East plays a red card. Luna has no red card. Among the cards in her hand, choose one to play: only the correct discard is clickable. Press the announced number key to play it, listen to the rule, then continue." }
      },
      // 13 — 2.4 blanks
      "39e0481f-2b3a-484a-b70a-b7116203e68a": {
        fr: { pre: "Exercice : un texte à trous sur les levées. Choisis les mots avec les touches chiffrées, puis appuie sur V pour valider." },
        en: { full: "Exercise: fill in the blanks about tricks. Press the number keys to pick the words in order, then press V to submit. The text covers: the first, blank, played; who wins the, blank; the strongest, blank; following, blank; the, blank, when you cannot follow; and who, blank, next. The words to place are read as numbered options." }
      },
      // 14 — CORRECT 2
      "fb64b39c-e682-49e0-b54c-3d6dedfc3489": {
        fr: { pre: "Victoire ! Une deuxième fiole de potion brille à l'écran." },
        en: { full: "Victory! A second potion vial shines on screen. Well done! You learned how to play cards and win a trick in Petit Bridge. Luna collects the Tricks Potion. Press 1 to continue." }
      },
      // 15 — MENU 3
      "b2c34569-5e6d-4e01-89ea-b6bb11a61749": {
        fr: { pre: "Leçon 3 : la Salle des Duos Magiques." },
        en: { full: "Lesson 3: the Hall of Magic Duos. Here Luna learns a very important rule of Petit Bridge: you never play alone. She must understand how to play with her partner, win tricks together and help her team. Success earns the Partners Potion. Are you ready to play as a team? Press 1 to begin." }
      },
      // 16 — 3.1 advise Luna
      "7ff1c552-96fe-4167-a102-1094b6c9b971": {
        fr: { pre: "Exercice : regarde la carte posée par le partenaire de Luna en Nord. Une seule carte du jeu de Luna est cliquable : la meilleure carte à jouer. Appuie sur le chiffre annoncé pour la poser." },
        en: { full: "Exercise: Luna started a game with her classmates. Look at the card played by her partner in North. Which card do you advise Luna, sitting South, to play? Only the best card in Luna's hand is clickable. Press the announced number key to play it, listen to the rule, then continue." }
      },
      // 17 — 3.2 advise Luna again
      "d287bcb6-1727-49a3-aded-b2ec30e8e7f4": {
        fr: { pre: "Même exercice, nouvelle donne. Le partenaire en Nord ne peut pas gagner la levée : à Luna de mettre sa grosse carte. Une seule carte est cliquable. Appuie sur le chiffre annoncé." },
        en: { full: "Same exercise, new deal. Luna's partner in North cannot win the trick with his card, so Luna should play her strong 8 to win for the team. Only the correct card is clickable. Press the announced number key to play it, then continue." }
      },
      // 18 — 3.3 what would you play
      "691201ac-7bc1-48de-9c26-e21d65a60c6c": {
        fr: { pre: "Exercice : le partenaire de Luna joue le 8 jaune. Réfléchis : que jouerait Est, et que jouerait Luna en Sud ? Une seule carte est cliquable : la bonne réponse. Appuie sur le chiffre annoncé." },
        en: { full: "Exercise: Luna's partner plays the yellow 8. What would you play as East? What should Luna play, sitting South? Observe the remaining cards in each hand. Only the correct card is clickable. Press the announced number key to play it, then continue." }
      },
      // 19 — 3.4 blanks
      "6f08499d-7e99-43d5-bccc-3d196fd56353": {
        fr: { pre: "Exercice : un texte à trous sur le jeu en équipe. Choisis les mots avec les touches chiffrées, puis appuie sur V pour valider." },
        en: { full: "Exercise: fill in the blanks about team play. Press the number keys to pick the words in order, then press V to submit. The text covers playing as a, blank; helping your, blank; not playing your, blank, card when your partner wins; not, blank, your strong cards; keeping them for the, blank; or you may, blank, the trick. The words to place are read as numbered options." }
      },
      // 20 — CORRECT 3
      "da5cbf73-37db-4a0d-a13b-634d7c05c95a": {
        fr: { pre: "Victoire ! Une troisième fiole de potion brille à l'écran." },
        en: { full: "Victory! A third potion vial shines on screen. Well done! You learned to play with your partner: in Petit Bridge you win tricks together. Luna collects the Partners Potion. Press 1 to continue." }
      },
      // 21 — MENU 4
      "f3557583-fb65-4d32-8894-a9569affd408": {
        fr: { pre: "Leçon 4 : la Bibliothèque des Dernières Leçons." },
        en: { full: "Lesson 4: the Library of Final Lessons. Here, one player lays their cards face up on the table: this player is called the dummy, l'endormi, the sleeping one. Their partner becomes the pilot of the team and decides which cards both of them play. If Luna succeeds, she collects the last potion of the grimoire: the Dummy Potion. Ready to help her? Press 1 to begin." }
      },
      // 22 — 4.1 play for the dummy
      "12dfc389-cdad-4df8-ae08-089c67f77b00": {
        fr: { pre: "Exercice : tu joues pour Ouest et tu poses le 8 vert. Le jeu de l'endormi se dévoile face visible. Luna pilote et doit poser le 4 vert pour son partenaire. Appuie sur le chiffre annoncé pour poser la carte demandée, puis valide avec V ou le bouton Vérification." },
        en: { full: "Exercise: you play for West and lay the green 8 on the table. The dummy's hand is revealed face up, and Luna plays for her partner. Lay the requested card, the green 4, then click Verification. Press the announced number key to play the card, then press V or activate the Verification button." }
      },
      // 23 — 4.2 image activity
      "30613d8b-9fb3-48af-b18b-448e79f97df6": {
        fr: { pre: "Question avec deux cartes en images. Réponse 1 : la carte 2 bleue, avec une souris. Réponse 2 : la carte 10 bleue, avec un dinosaure. Nord, l'endormi, est visible. Comment jouerais-tu à la place d'Est ? Appuie sur 1 ou 2 pour choisir une carte." },
        en: { full: "Question with two picture cards. Option 1: the blue 2 card, showing a mouse. Option 2: the blue 10 card, showing a dinosaur. North is the dummy and his cards are visible. How would you play in East's seat? Press 1 or 2 to choose a card. Hint: do not waste a strong card if it is not needed." }
      },
      // 24 — 4.3 order the cards
      "9f7caa94-e14b-4d42-a5b8-a3dc9e5916e8": {
        fr: { pre: "Exercice difficile : il faut cliquer les cartes de Luna et de l'endormi dans le bon ordre pour gagner 4 levées. Les éléments cliquables sont numérotés : essaie, le jeu te dira si tu t'es trompé et tu pourras recommencer." },
        en: { full: "Hard exercise: Luna plays with the dummy's hand in North. Click the cards in the right order so her team wins 4 tricks without knowing the opponents' cards. Clickable cards are numbered: try them, the game tells you if you start with the wrong card and you can start over." }
      },
      // 25 — 4.4 blanks
      "0c33ceb9-bde4-435e-8df2-b19f61a4670f": {
        fr: { pre: "Dernier texte à trous, sur l'endormi. Choisis les mots avec les touches chiffrées, puis appuie sur V pour valider." },
        en: { full: "Last fill-in-the-blanks, about the dummy. Press the number keys to pick the words in order, then press V to submit. The text covers: the, blank, the first card played; the player to the, blank; whose cards become, blank; this player is the, blank; and the partner who, blank, for both. The words to place are read as numbered options." }
      },
      // 26 — CORRECT 4
      "49b9a96c-b21b-4eac-ab36-a0c339336146": {
        fr: { pre: "Victoire finale ! Les quatre fioles de potion brillent ensemble autour du grimoire." },
        en: { full: "Final victory! The four potion vials shine together around the grimoire. Congratulations! You helped Luna collect the last potion: the Dummy Potion. Luna has finished every lesson of the Petit Bridge grimoire. She knows the key rules: the cards, the tricks, team play, and the role of the dummy. Press 1 to continue." }
      },
      // 27 — FINAL
      "1a943fe1-d2cc-4eab-952d-7f9de781cb39": {
        fr: { pre: "Page finale, avec des liens vers des ressources du vrai jeu." },
        en: { full: "Final page. It is now time to move on to the real game! This page contains links to real-game resources. Press L to list the available links." }
      },
      // 28 — EXIT
      "88761768-1922-4696-bde4-2cbd461f53f9": {
        fr: { pre: "Page de sortie." },
        en: { full: "Exit page. Are you sure you want to stop the adventure? If you quit now, you will not discover all the secrets of Petit Bridge. Choose: I continue, or I stop. Press L to list the choices." }
      },

      // ----- Rule recap popups -----
      "58e3a383-70dc-491a-a840-0f77dacf96ec": {
        fr: { pre: "Fenêtre de règle." },
        en: { full: "Rule window. Well done! Rule 1: you must follow the color asked by the first card played on the table. Example: if the first card on the table is green, you must play a green card from your hand. Press 1 to close and continue." }
      },
      "d3d0d916-eb44-4b1c-827c-e2b2af58e483": {
        fr: { pre: "Fenêtre de règle." },
        en: { full: "Rule window. Well done! Rule 2: the player who played the strongest card wins the trick, and leads the next one. The goal of the game is to win more tricks than your opponents. Memo: a trick is the set of 4 cards played, one by each player. Each game has at most 10 tricks. Press 1 to close and continue." }
      },
      "28f5ed17-70d2-4029-b796-0f93a979520c": {
        fr: { pre: "Fenêtre de règle." },
        en: { full: "Rule window. Well done! Rule 3: if you have no card of the requested color, you discard a card of another color, but it cannot win the trick. Example: if red is asked and I have no red, my yellow 9 cannot win the trick. Better to throw a small card, like the green 2. Press 1 to close and continue." }
      },
      "4ae95e6b-283e-4783-97bb-5249aa12242e": {
        fr: { pre: "Fenêtre de règle." },
        en: { full: "Rule window. Well done! Rule 4: Petit Bridge is a team game, play without wasting! Watch the cards your partner plays. If your partner is going to win the trick, do not play your strongest card: keep it to win another trick later. Press 1 to close and continue." }
      },
      "273005c0-457f-40dd-b1a0-13b64ccc4793": {
        fr: { pre: "Fenêtre de règle." },
        en: { full: "Rule window. Well done! Rule 5: playing without wasting does not always mean keeping your strong cards for the end! Exercise answer: here East cannot win, so he should play his small card, and South must play the yellow 10, otherwise West wins with his yellow 9. Press 1 to close and continue." }
      },
      "f9cedbec-bc0d-45ed-871a-ac5d853e2fdf": {
        fr: { pre: "Fenêtre de règle." },
        en: { full: "Rule window. Well done! Rule 6: when the lead card is played, the player to the left lays their hand face up: they become the dummy, and their partner decides which cards to play for both. The lead is the first card played in the game. Press 1 to close and continue." }
      }
    },

    // Spoken labels for clickable elements (element UUID -> {fr, en})
    labels: {
      "3cefd4ea-aa4b-489d-adfd-e34f43369821": { fr: "Démarrer le jeu", en: "Start the game" },
      "74135c1f-b498-46ce-ac6c-61572f4dcd08": { fr: "Continuer", en: "Continue" },
      "4f0ee0c5-f0b4-4332-832f-e6cd99e0ff40": { fr: "Commencer la leçon 1", en: "Start lesson 1" },
      "f9719d48-48e4-4991-9f9d-658b663a40ad": { fr: "Continuer vers la leçon 2", en: "Continue to lesson 2" },
      "ac4e2d4f-cd4e-4920-a7c1-5e3679c4387e": { fr: "Commencer la leçon 2", en: "Start lesson 2" },
      "5ab16bb2-c1d1-4e5c-a481-d27eb89a88c0": { fr: "Continuer vers la leçon 3", en: "Continue to lesson 3" },
      "f0e6a9dc-0a38-4995-8f4b-bccf228e0620": { fr: "Commencer la leçon 3", en: "Start lesson 3" },
      "77e2dce9-f702-45cd-8756-462bf4c1d57b": { fr: "Continuer vers la leçon 4", en: "Continue to lesson 4" },
      "ec44f844-2326-42f9-9265-92f87d43228a": { fr: "Commencer la leçon 4", en: "Start lesson 4" },
      "2a29fef8-43ee-402c-bb48-f2e852c415c9": { fr: "Continuer", en: "Continue" },
      "fd178997-1bd6-4361-8b4b-7eff4f9e9fc8": { fr: "Poser la carte verte de Luna", en: "Play Luna's green card" },
      "537180c1-21ca-4668-8a2c-aa5c45b0160e": { fr: "Continuer, page suivante", en: "Continue, next page" },
      "881b13b7-e7cf-450f-902f-090ef40a7a4a": { fr: "Poser la carte choisie", en: "Play the chosen card" },
      "626ca610-e73f-49a1-abfa-e05f9eb13683": { fr: "Continuer, page suivante", en: "Continue, next page" },
      "550e3212-614b-4027-acdf-e87a1c3ec64f": { fr: "Poser la carte choisie et continuer", en: "Play the chosen card and continue" },
      "23a521c9-d238-4bcd-9eba-5f102468610a": { fr: "Poser la carte choisie", en: "Play the chosen card" },
      "c8cb482c-eaee-4002-b282-1ebb49beec32": { fr: "Continuer, page suivante", en: "Continue, next page" },
      "29614bbb-2a6a-41bd-835e-4afedf01eec8": { fr: "Poser le 4 vert", en: "Play the green 4" },
      "f1fd2d46-2ba6-43e3-a73f-47f8b0de1b14": { fr: "Continuer, page suivante", en: "Continue, next page" },
      "270ad310-69ca-4b6d-97fa-2d656673ea32": { fr: "Vérification", en: "Verification" },
      "1360f500-140e-4b2f-8ff4-293c5586ee3b": { fr: "Continuer, page suivante", en: "Continue, next page" },
      "28ede7f1-8ccf-41ab-9e5a-8a4109e4897d": { fr: "Poser la carte demandée", en: "Play the requested card" },
      "9960fefb-39b6-4126-94c4-2511a4473f31": { fr: "J'arrête, retour au début", en: "I stop, back to start" },
      "508e97ec-b845-4e22-bba5-db9a367f1e65": { fr: "Je continue le jeu", en: "I continue playing" },
      // "Quit" arrow present on most pages (leads to the exit page)
      "141aa533-ef08-4a51-a892-389076cbb618": { fr: "Quitter le jeu", en: "Quit the game" },
      "d3bee071-5eb0-4be8-9209-22db0903152f": { fr: "Quitter le jeu", en: "Quit the game" },
      "8293e06e-7427-4986-a785-f99c6da6e833": { fr: "Quitter le jeu", en: "Quit the game" },
      "b6882bc7-81d6-4f2c-b6e8-f77f01ec96ad": { fr: "Quitter le jeu", en: "Quit the game" },
      "cc51be72-fea3-4640-97a2-34261bb437d9": { fr: "Quitter le jeu", en: "Quit the game" },
      "4c44603a-af57-4bfc-a244-4d549be3d63e": { fr: "Quitter le jeu", en: "Quit the game" },
      "2e3e1202-5672-45ae-ab17-b1ee2865d7b5": { fr: "Quitter le jeu", en: "Quit the game" },
      "ac3e3090-dc7e-4f16-a403-2edd414af6ea": { fr: "Quitter le jeu", en: "Quit the game" },
      "be49f8d1-883b-4d3e-a728-d3568c11243a": { fr: "Quitter le jeu", en: "Quit the game" },
      "d1ec6dcc-73eb-473f-b1e2-8619354f3565": { fr: "Quitter le jeu", en: "Quit the game" },
      "11616fab-25f9-4d90-bb3a-c8181bd743f4": { fr: "Quitter le jeu", en: "Quit the game" },
      "e72b9887-8f48-4e4c-bc83-a6b47b675035": { fr: "Quitter le jeu", en: "Quit the game" },
      "2f193e8e-4eac-441e-8d74-6791cce1a72a": { fr: "Quitter le jeu", en: "Quit the game" },
      "674d7513-bf20-41a0-9736-f0835089c497": { fr: "Quitter le jeu", en: "Quit the game" },
      "b314add8-2edc-499b-8b73-c0ae1ba61868": { fr: "Rejouer depuis le début", en: "Play again from the start" }
    },

    // Exact-match FR -> EN translations for strings read from the live page
    translate: {
      "Combien y a-t-il de familles (couleurs) dans le jeu de cartes du Petit Bridge ?": "How many families (colors) are there in the Petit Bridge card game?",
      "1 famille": "1 family",
      "2 familles": "2 families",
      "4 familles": "4 families",
      "5 familles": "5 families",
      "Quelle est la carte la plus forte dans une couleur ?": "Which is the strongest card in a color?",
      "le 9": "the 9", "le 5": "the 5", "le 10": "the 10", "le 1": "the 1",
      "Qui est le partenaire de Luna, en Nord ?": "Who is the partner of Luna's North player?",
      "Ouest": "West", "Est": "East", "Sud": "South", "Nord": "North",
      "À ton avis, qui a gagné la levée ?": "In your opinion, who won the trick?",
      "Nord est endormi. Comment jouerais-tu à la place d'Est ?": "North is the dummy. How would you play in East's seat?",
      "Remplissez les blancs avec les bonnes réponses.": "Fill in the blanks with the right answers.",
      "partenaire": "partner", "équipe": "team",
      "carte": "card", "forte": "strong", "levée": "trick", "défausse": "discard",
      "couleur": "color", "rejoue.": "plays again.",
      "grosse": "big", "gaspiller": "waste", "fin": "end", "perdre": "lose",
      "décide": "decides", "entame": "lead", "visible": "visible", "gauche": "left", "endormi": "dummy",
      "Envoyer": "Send", "Continue": "Continue", "DÉMARRER": "START",
      "Bravo !": "Well done!", "Bravo!": "Well done!",
      "Bravo ! Tu es prêt.e pour la suite des aventures": "Well done! You are ready for the next adventures.",
      "Attention ! Regarde bien les cartes affichées. Combien de couleurs différentes vois-tu ?": "Careful! Listen again: how many different colors are there?",
      "Attention ! Regarde bien les cartes affichées. Quelle est la carte avec le nombre le plus grand ?": "Careful! Which card has the highest number?",
      "Attention ! Regarde bien l'image. Quel est le joueur placé en face du joueur Nord ?": "Careful! Which player sits opposite the North player?",
      "Attention ! Regarde bien qui a posé la carte la plus forte.": "Careful! Think about who played the strongest card.",
      "Attention ! Aide toi des images...": "Careful! Use the clues...",
      "Attention ! Rappelle toi des règles que l'on a découvert ensemble...": "Careful! Remember the rules we discovered together...",
      "Non, ce n'est pas le meilleur choix.": "No, that is not the best choice.",
      "Ce n'est pas la bonne réponse. Regarde bien la carte posée par ton partenaire en Nord. Recommence !": "That is not the right answer. Think about the card played by your partner in North. Try again!",
      "Ce n'est pas la bonne réponse. Observe bien l'ensemble des cartes restant dans les mains de chaque joueur. Recommence !": "That is not the right answer. Consider all the cards left in each player's hand. Try again!",
      "Attention, tu n'as pas commencé par la bonne carte. Recommence.": "Careful, you did not start with the right card. Start over.",
      "Bravo ! Ton partenaire ne peut pas gagner la levée avec sa carte. À toi de mettre ton 8 pour faire gagner ton équipe !": "Well done! Your partner cannot win the trick with his card. Play your 8 to win for your team!"
    }
  }
};

// ---------------------------------------------------------------------------
// Audiodescription layer ("décor" option / D key): rich visual descriptions
// of each page's scenery, shared per chapter and merged as fr/en `detail`.
(function () {
  const S = window.PBA_DESCRIPTIONS["697f6a08ef130744478db916"].slides;

  const SCENES = {
    castle: {
      fr: "Le décor : l'école de magie, un grand château doré aux toits pointus bleus, accroché à la montagne entre deux cascades. Devant l'entrée, une fontaine de pierre fait flotter une grosse bulle de cristal lumineuse. Des lanternes dorées éclairent un parvis de pierres, des fleurs violettes, et un grimoire ouvert posé sur un pupitre en bois.",
      en: "The scenery: the school of magic, a tall golden castle with pointed blue roofs, perched on the mountain between two waterfalls. By the entrance, a stone fountain holds a big glowing crystal bubble. Golden lanterns light a stone courtyard, purple flowers, and an open grimoire resting on a wooden stand."
    },
    children: {
      fr: "Quatre enfants magiciens s'avancent avec un chat noir : un garçon à la cape verte qui tient une tasse et une carte, Luna avec sa grande cape et son chapeau violets, sa baguette levée, un garçon à la cape bleue qui lève le poing, et une fille à la cape rouge qui porte un grand livre brillant.",
      en: "Four young wizards walk along with a black cat: a boy in a green cape holding a cup and a card, Luna in her big purple cape and hat, wand raised, a boy in a blue cape lifting his fist, and a girl in a red cape carrying a big glowing book."
    },
    forest: {
      fr: "Le décor : la Forêt des Premiers Pas, une forêt enchantée baignée d'une lumière verte et dorée. Un chemin de planches de bois passe entre des arbres géants couverts de mousse et mène à une arche de pierre qui brille au loin. Des lucioles dorées dansent dans l'herbe, et de gros champignons violets et rouges poussent au bord du chemin.",
      en: "The scenery: the Forest of First Steps, an enchanted forest bathed in green and golden light. A path of wooden planks winds between giant moss-covered trees toward a stone arch glowing in the distance. Golden fireflies dance in the grass, and big purple and red mushrooms grow along the path."
    },
    cave: {
      fr: "Le décor : la Grotte des Jeux Secrets, éclairée par des cristaux géants violets, roses et bleus accrochés au plafond et aux rochers. Un chemin de pierre longe une petite rivière souterraine et monte vers un autel couvert d'un tissu vert, avec des bougies allumées et des pièces d'or éparpillées. Des champignons roses brillent doucement dans la pénombre.",
      en: "The scenery: the Cave of Secret Games, lit by giant purple, pink and blue crystals hanging from the ceiling and growing on the rocks. A stone path follows a small underground river up to an altar draped in green cloth, with lit candles and gold coins scattered around. Pink mushrooms glow softly in the dark."
    },
    salon: {
      fr: "Le décor : la Salle des Duos Magiques, un salon chaleureux éclairé par un lustre doré. Au centre, une table ronde au tapis vert, entourée de quatre fauteuils de velours. Une boule de cristal bleue flotte au-dessus de la table en scintillant. Tout autour, des bibliothèques pleines de livres, des cristaux lumineux, et un grand cercle magique bleu qui brille sur le sol.",
      en: "The scenery: the Room of Magic Duos, a cosy parlour lit by a golden chandelier. In the middle, a round table with a green felt top, surrounded by four velvet armchairs. A blue crystal ball floats above the table, sparkling. All around, bookshelves full of books, glowing crystals, and a big blue magic circle shining on the floor."
    },
    library: {
      fr: "Le décor : la Bibliothèque des Dernières Leçons, une salle immense aux murs couverts de milliers de livres sur deux étages. Un grand escalier monte vers un vitrail plein de lumière. Au centre, sur une table ronde, un énorme grimoire ouvert rayonne d'une lumière dorée, entouré de chandelles et de fauteuils de cuir.",
      en: "The scenery: the Library of Final Lessons, a huge hall whose walls are covered with thousands of books on two floors. A grand staircase climbs toward a stained-glass window full of light. In the middle, on a round table, an enormous open grimoire glows with golden light, surrounded by candles and leather armchairs."
    },
    kit: {
      fr: "Sur la page, le matériel du petit magicien : un balai de bois, un chapeau pointu violet couvert d'étoiles, un chaudron noir où bouillonne une potion bleue, des bougies, un éventail de cartes, et quatre fioles de potion : une verte, une dorée, une rouge, et une bleue surmontée d'un cristal violet.",
      en: "On the page, the little wizard's kit: a wooden broom, a pointed purple hat covered in stars, a black cauldron where a blue potion bubbles, candles, a fan of cards, and four potion flasks: a green one, a golden one, a red one, and a blue one topped with a purple crystal."
    },
    parchment: {
      fr: "Le décor : un grand parchemin déroulé, aux bords enroulés sur des baguettes de bois, posé par-dessus la page du jeu.",
      en: "The scenery: a large unrolled parchment, its edges curled around wooden rods, laid over the game page."
    }
  };

  const IDS = {"1":"25be3f38-4674-42cb-9655-b9f3a6fb3cea","2":"75f3916a-294d-4169-8f49-e58c0507c8bd","3":"2fe009a2-dc3e-41d3-9e23-4413934cfdb4","4":"75b307ab-cec5-4c6a-ac2f-397a5b9c22ab","5":"551f03f3-bd02-4386-a734-26c2fc9fea5e","6":"412011e6-82c8-4ec9-93bf-a955dc92d170","7":"13eed9f3-c1c2-4e60-a09f-801f26b88141","8":"7ba0dff2-a163-4d1e-be21-f14708169bad","9":"c78e738d-13ea-4403-b39f-b5aa21e14891","10":"22c81fcd-2d61-4730-a7c2-25ec0b84953a","11":"5968dea4-b0a6-4f89-80fb-c5b0faa48f3b","12":"79a07f39-4f31-4642-bdff-5d22879978b3","13":"39e0481f-2b3a-484a-b70a-b7116203e68a","14":"fb64b39c-e682-49e0-b54c-3d6dedfc3489","15":"b2c34569-5e6d-4e01-89ea-b6bb11a61749","16":"7ff1c552-96fe-4167-a102-1094b6c9b971","17":"d287bcb6-1727-49a3-aded-b2ec30e8e7f4","18":"691201ac-7bc1-48de-9c26-e21d65a60c6c","19":"6f08499d-7e99-43d5-bccc-3d196fd56353","20":"da5cbf73-37db-4a0d-a13b-634d7c05c95a","21":"f3557583-fb65-4d32-8894-a9569affd408","22":"12dfc389-cdad-4df8-ae08-089c67f77b00","23":"30613d8b-9fb3-48af-b18b-448e79f97df6","24":"9f7caa94-e14b-4d42-a5b8-a3dc9e5916e8","25":"0c33ceb9-bde4-435e-8df2-b19f61a4670f","26":"49b9a96c-b21b-4eac-ab36-a0c339336146","27":"1a943fe1-d2cc-4eab-952d-7f9de781cb39","28":"88761768-1922-4696-bde4-2cbd461f53f9","29":"273005c0-457f-40dd-b1a0-13b64ccc4793","30":"28f5ed17-70d2-4029-b796-0f93a979520c","31":"4ae95e6b-283e-4783-97bb-5249aa12242e","32":"58e3a383-70dc-491a-a840-0f77dacf96ec","33":"d3d0d916-eb44-4b1c-827c-e2b2af58e483","34":"f9cedbec-bc0d-45ed-871a-ac5d853e2fdf"};

  // order -> scenes composing the page's audiodescription
  const PLAN = {
    1: ['castle', 'children'], 2: ['castle'],
    3: ['forest'], 4: ['forest'], 5: ['forest'], 6: ['forest'], 7: ['forest'],
    8: ['forest', 'kit'],
    9: ['cave'], 10: ['cave'], 11: ['cave'], 12: ['cave'], 13: ['cave'],
    14: ['cave', 'kit'],
    15: ['salon'], 16: ['salon'], 17: ['salon'], 18: ['salon'], 19: ['salon'],
    20: ['salon', 'kit'],
    21: ['library'], 22: ['library'], 23: ['library'], 24: ['library'], 25: ['library'],
    26: ['library', 'kit'],
    27: ['castle', 'children'], 28: ['castle'],
    29: ['parchment'], 30: ['parchment'], 31: ['parchment'],
    32: ['parchment'], 33: ['parchment'], 34: ['parchment']
  };

  for (const [order, scenes] of Object.entries(PLAN)) {
    const slide = S[IDS[order]];
    if (!slide) continue;
    slide.fr = slide.fr || {};
    slide.en = slide.en || {};
    slide.fr.detail = scenes.map(k => SCENES[k].fr).join(' ');
    slide.en.detail = scenes.map(k => SCENES[k].en).join(' ');
  }
})();

// ---------------------------------------------------------------------------
// Episode 2 - "Mission BridgeBot : le protocole Mini Bridge" (sci-fi sequel).
window.PBA_DESCRIPTIONS["6999b0b9d1e83ea5a328b462"] = (function () {
  const SC = {
    control: {
      fr: "Le décor : la salle de contrôle d'un vaisseau spatial, sombre et silencieuse. Un écran géant encadré de néons bleu turquoise affiche BridgeBot en grandes lettres lumineuses. Devant, un pupitre de commande et un fauteuil vide ; sur le côté, des consoles couvertes d'écrans et de boutons.",
      en: "The scenery: the control room of a spaceship, dark and silent. A giant screen framed in glowing cyan neon displays BridgeBot in big bright letters. In front of it, a command desk and an empty chair; on the side, consoles covered with screens and buttons."
    },
    bridge: {
      fr: "Le décor : la passerelle circulaire du vaisseau. Au centre, une console hexagonale entourée de fauteuils pivotants et de deux écrans de contrôle. Des tubes de lumière bleu turquoise éclairent les murs blindés et une grande porte ronde fermée, comme un coffre-fort.",
      en: "The scenery: the ship's circular command bridge. In the middle, a hexagonal console surrounded by swivel chairs and two control screens. Cyan light tubes line the armoured walls and a big round closed door, like a vault."
    },
    initRoom: {
      fr: "Le décor : la Salle d'initialisation, un laboratoire futuriste tout blanc, baigné de lumière. Des cartes du monde holographiques bleues flottent sur les murs et au plafond. Sur le sol brillant, des circuits lumineux bleu turquoise relient des pupitres ronds, comme les pièces d'une machine géante.",
      en: "The scenery: the Initialisation Room, a futuristic lab all in white, bathed in light. Blue holographic world maps float on the walls and ceiling. On the shiny floor, glowing cyan circuits connect round consoles, like parts of a giant machine."
    },
    simRoom: {
      fr: "Le décor : la Salle de simulation, une grande salle sombre. Quatre tables de jeu lumineuses marquées Nord, Sud, Est et Ouest brillent en bleu électrique, et des cartes à jouer holographiques flottent dans les airs comme des papillons de lumière.",
      en: "The scenery: the Simulation Room, a large dark hall. Four glowing game tables marked North, South, East and West shine electric blue, and holographic playing cards float in the air like butterflies of light."
    },
    stratRoom: {
      fr: "Le décor : la Salle des stratégies, éclairée en orange et vert. Sur de grands écrans, des robots en armure bleue, verte, orange et violette s'affrontent en tournoi, avec leurs scores affichés en chiffres lumineux. Des lignes d'énergie relient les équipes comme un plan de bataille.",
      en: "The scenery: the Strategy Room, lit in orange and green. On big screens, robots in blue, green, orange and purple armour compete in a tournament, their scores shown in glowing digits. Lines of energy connect the teams like a battle plan."
    },
    pilotRoom: {
      fr: "Le décor : la Salle du pilotage central, plongée dans une lumière violette. Tu te trouves au cœur d'un circuit électronique géant, avec ses fils et ses composants. Au centre, deux grandes cartes à jouer au dos décoré brillent en rose et en bleu, posées comme des puces sur la carte mère.",
      en: "The scenery: the Central Piloting Room, bathed in purple light. You stand at the heart of a giant electronic circuit board, with its wires and components. In the middle, two large playing cards with ornate backs glow pink and blue, set like chips on the motherboard."
    },
    projRoom: {
      fr: "Le décor : la Salle de projection, bleu nuit. Un immense écran affiche des circuits lumineux et des lignes de code. De chaque côté, des postes de contrôle portent le logo BridgeBot, et au centre trône un petit podium rond à trois marches.",
      en: "The scenery: the Projection Room, midnight blue. A huge screen displays glowing circuits and lines of code. On each side, control stations carry the BridgeBot logo, and in the middle stands a small round podium with three steps."
    },
    robots: {
      fr: "Le décor : la salle baigne maintenant dans une lumière verte de victoire. Sur l'écran géant, une grande coche verte et les mots Système restauré. Au centre, BridgeBot, un grand robot blanc et argenté au ventre vert, entouré de quatre petits robots bleu, vert, orange et violet qui affichent des cœurs sur leur poitrine.",
      en: "The scenery: the room now glows with green victory light. On the giant screen, a big green check mark and the words System restored. In the middle stands BridgeBot, a tall white and silver robot with a green chest, surrounded by four small robots in blue, green, orange and purple, hearts glowing on their chests."
    },
    exitRoom: {
      fr: "Le décor : une salle blanche et calme du vaisseau, avec des tables rondes holographiques qui projettent des cartes du monde en bleu pâle.",
      en: "The scenery: a calm white room of the ship, with round holographic tables projecting pale blue world maps."
    },
    panel: {
      fr: "Le décor : un grand écran de données s'affiche par-dessus la page, comme une fiche de protocole du vaisseau.",
      en: "The scenery: a large data screen appears over the page, like one of the ship's protocol sheets."
    }
  };

  const slides = {};
  const def = (id, scene, fr, en) => {
    slides[id] = {
      fr: { pre: fr, detail: SC[scene].fr },
      en: { full: en, detail: SC[scene].en }
    };
  };

  def("25be3f38-4674-42cb-9655-b9f3a6fb3cea", 'control',
    "Page de couverture.",
    "Cover page. Press 1 to start the game.");
  def("75f3916a-294d-4169-8f49-e58c0507c8bd", 'bridge',
    "L'écran de briefing de ta mission.",
    "Your mission briefing. In the near future, humans entrusted strategy games to a central artificial intelligence: BridgeBot. But evil robots infiltrated its system, took control and corrupted it. Now it applies the rules without understanding them and disrupts every game. That is where you come in. You are recruited as reprogramming agents. Your mission: restore the essential Mini Bridge protocols, neutralise the corrupted robots and give BridgeBot back its ability to think and play as a team. Will you take back control of the system before it is too late? Press 1 to continue.");
  def("24c272ea-52d9-4928-a9e8-d5833f369c88", 'initRoom',
    "Mission 1 : la Salle d'initialisation.",
    "Mission 1: the Initialisation Room. Protocol: system foundations. BridgeBot has been hacked. The corrupted robots disabled the basics of Mini Bridge: the system no longer recognises the cards, the players or the positions. Your first mission is to reactivate the Foundations Module. You will identify the Mini Bridge equipment, understand how cards are dealt, place the players correctly and reactivate the idea of a team. Press 1 to begin.");
  def("50c01e57-811e-4701-b927-ac1c319cfb30", 'initRoom',
    "Question 1 sur 4. Les cartes du Mini Bridge sont affichées en rangées colorées.",
    "Question 1 of 4. The Mini Bridge cards are displayed in coloured rows. How many suits are there in the Mini Bridge card deck?");
  def("392bc879-3c71-4d3e-b715-325c2e96b76e", 'initRoom',
    "Question 2 sur 4. Une rangée de cartes est affichée, de la plus faible à gauche à la plus forte à droite.",
    "Question 2 of 4. A row of cards is displayed, from the weakest on the left to the strongest on the right. What is the strongest card in a suit?");
  def("b29c701a-c65d-4920-b3dd-71301d2cdaed", 'initRoom',
    "Question 3 sur 4. L'image montre un tapis de jeu vu de dessus, avec les quatre joueurs placés aux points cardinaux.",
    "Question 3 of 4. The picture shows a game mat seen from above, with four players at the compass points. In bridge you play two against two; partners sit facing each other. Who is North's partner?");
  def("dae35015-e12b-4fe8-ad4d-b615e164d900", 'initRoom',
    "Question 4 sur 4. Exercice : un texte à trous. Choisis les mots avec les touches chiffrées pour remplir les blancs, puis valide avec V.",
    "Question 4 of 4. A fill-in-the-blanks exercise. Pick the words with the number keys to fill the gaps, then press V to submit.");
  def("70c19774-f41b-42ba-a75e-8e93ff5b29ff", 'initRoom',
    "Victoire ! Le Module Fondations s'allume sur l'écran.",
    "Victory! You discovered the Mini Bridge equipment and restored BridgeBot's Foundations Module. Press 1 to continue.");
  def("0ba7eb8d-2f8f-43cb-983f-3b5989a496fc", 'simRoom',
    "Mission 2 : la Salle de simulation.",
    "Mission 2: the Simulation Room. Protocol: tricks and rules. The corrupted robots scrambled the rules of the game. BridgeBot no longer knows how to play a card properly. You will respect the requested suit, understand how a trick is won, and identify the strongest card. Each good decision reactivates a line of code. At the end of the mission you will restore the Tricks Module. Press 1 to begin.");
  def("62f19c7d-478e-420c-953d-8a564db9d911", 'simRoom',
    "Question 1 sur 4. Une partie est en cours sur la table holographique : Ouest a posé le Roi de carreau, et chaque joueur met une carte à carreau. Choisis une carte de ton jeu avec les touches chiffrées.",
    "Question 1 of 4. A game is running on the holographic table: West dealt and led the King of diamonds, and every player plays a diamond. Among your diamonds, choose a card to play with the number keys.");
  def("d0a88456-92a3-4349-aee4-c7eb0a85a3ad", 'simRoom',
    "Question 2 sur 4. Sur la table, chaque joueur a joué une carte à pique.",
    "Question 2 of 4. A spade was led on the table, and every player played a spade from their hand. In your opinion, who won the trick?");
  def("1f5b78ad-8caa-414e-94f5-b35f0f9abcea", 'simRoom',
    "Question 3 sur 4. Nord a gagné la levée avec l'As de pique et rejoue un 5 de cœur ; Est pose le 9 de cœur. Tu n'as pas de cœur : choisis une carte à défausser avec les touches chiffrées.",
    "Question 3 of 4. North won the trick with the Ace of spades and leads the 5 of hearts; East plays the 9 of hearts. You have no hearts: choose a card to discard with the number keys.");
  def("a7f00ca1-58e4-4cc1-81e4-8f010ef3b73f", 'simRoom',
    "Question 4 sur 4. Exercice : un texte à trous. Choisis les mots avec les touches chiffrées, puis valide avec V.",
    "Question 4 of 4. A fill-in-the-blanks exercise. Pick the words with the number keys, then press V to submit.");
  def("83c66b33-ffd5-4d61-8503-b7a4f8cc0bcd", 'simRoom',
    "Victoire ! Le Module des Levées s'allume sur l'écran.",
    "Victory! You learned how to play cards and win a trick. You restore the Tricks Module. Press 1 to continue.");
  def("2757ec9a-0d4b-4ca9-8d21-24da3b5d2eea", 'stratRoom',
    "Mission 3 : la Salle des stratégies.",
    "Mission 3: the Strategy Room. Protocol: team play. BridgeBot now plays alone... it forgot that Mini Bridge is played two against two. You will watch your partner's cards, decide when to support them, avoid wasting a strong card, and understand that you do not play only for yourself. If you succeed you will reactivate the Cooperation Module and neutralise one more corrupted robot. Press 1 to begin.");
  def("f886a5a6-746a-4a30-ab65-39968aa542d7", 'stratRoom',
    "Question 1 sur 4. Une partie est affichée sur la table : ton partenaire en Nord a déjà posé une carte. Conseille une carte à BridgeBot avec les touches chiffrées.",
    "Question 1 of 4. A game is displayed on the table: your partner in North has already played a card. Advise BridgeBot which card to play, using the number keys.");
  def("a25d9c4c-6b09-4230-a7e6-fa4f4ac26198", 'stratRoom',
    "Question 2 sur 4. Une nouvelle donne est affichée. Conseille une carte à BridgeBot avec les touches chiffrées.",
    "Question 2 of 4. A new deal is displayed. Advise BridgeBot which card to play, using the number keys.");
  def("408c9316-b954-425c-9aaf-d0c4cffc4f03", 'stratRoom',
    "Question 3 sur 4. Les mains de chaque joueur sont visibles. Conseille une carte pour Est et pour Sud avec les touches chiffrées.",
    "Question 3 of 4. Every player's cards are visible. Advise which card East and South should play, using the number keys.");
  def("6e78eea0-10b2-493c-b9ff-638a92577ee2", 'stratRoom',
    "Question 4 sur 4. Exercice : un texte à trous. Choisis les mots avec les touches chiffrées, puis valide avec V.",
    "Question 4 of 4. A fill-in-the-blanks exercise. Pick the words with the number keys, then press V to submit.");
  def("6d701235-b927-4f1d-8139-ce8c25cccae4", 'stratRoom',
    "Victoire ! Le Module Coopération s'allume sur l'écran.",
    "Victory! You learned to play with your partner: you win tricks together. You restore the Cooperation Module. Press 1 to continue.");
  def("d6dbbffb-3aba-4ac6-ad5b-9bed4b1e639b", 'pilotRoom',
    "Mission 4 : la Salle du pilotage central.",
    "Mission 4: the Central Piloting Room. Protocol: the dummy. The enemy robots disabled the most strategic module: the Dummy. BridgeBot no longer understands that a player can pilot their partner's cards when they are face up. In this room you will identify the opening lead, understand the dummy's role, know that the dummy makes no decisions, and pilot both hands with strategy. Press 1 to begin.");
  def("71497f16-6c41-4304-a27d-933852b5a254", 'pilotRoom',
    "Question 1 sur 4. Ouest pose l'As de carreau. Le jeu de l'Endormi se dévoile face visible : tu joues pour ton partenaire. Pose le 6 de carreau sur la table, puis valide avec V.",
    "Question 1 of 4. West leads the Ace of diamonds. The dummy's hand is revealed face up: you play for your partner. Put the 6 of diamonds on the table, then press V to submit.");
  def("9c37de8b-42c7-41e6-9f33-8ef8bcbc8119", 'pilotRoom',
    "Question 2 sur 4. Nord est l'Endormi, ses cartes sont visibles. Deux choix de jeu te sont proposés en images.",
    "Question 2 of 4. North is the dummy, its cards are face up. Two ways of playing are shown as pictures: how would you play in East's place? Choose with the number keys.");
  def("b5e5643a-6448-400b-b374-e701ab972a50", 'pilotRoom',
    "Question 3 sur 4. Tu joues avec le jeu de l'Endormi en Nord. Pose tes cartes dans le bon ordre pour gagner 4 levées, avec les touches chiffrées.",
    "Question 3 of 4. You play with the dummy's hand in North. Play your cards in the right order to win 4 tricks, using the number keys.");
  def("4d55708b-1c18-42b2-92b9-7ef5a66b60ce", 'pilotRoom',
    "Question 4 sur 4. Exercice : un texte à trous. Choisis les mots avec les touches chiffrées, puis valide avec V.",
    "Question 4 of 4. A fill-in-the-blanks exercise. Pick the words with the number keys, then press V to submit.");
  def("637eb069-49db-4ed4-89c5-5dbf15e53e46", 'pilotRoom',
    "Victoire ! Le Module Endormi s'allume sur l'écran.",
    "Victory! BridgeBot now knows the essential rules: the cards, the tricks, team play and the dummy's role. You restore the Dummy Module. Press 1 to continue.");
  def("7686455e-181b-4c9c-9f9e-bfa4b9b32428", 'projRoom',
    "Mission 5 : la Salle de projection.",
    "Mission 5: the Projection Room. Protocol: choosing the contract. The corrupted robots sabotaged the planning module. BridgeBot plays cards but can no longer set a goal before starting. In Mini Bridge you do not play at random: before the first card, the team decides how many tricks it thinks it can win. You will look at your team's cards, identify your strengths, count likely tricks and choose a realistic contract. If you succeed you will restore the Contract Module. Press 1 to begin.");
  def("815ab4f3-01f9-4054-9389-bb49e2a10967", 'projRoom',
    "Question 1 sur 4. L'écran affiche la valeur des Honneurs : l'As vaut 4 points, le Roi 3, la Dame 2 et le Valet 1. Une main de cartes est affichée.",
    "Question 1 of 4. The screen shows the value of the honours: the Ace is worth 4 points, the King 3, the Queen 2 and the Jack 1. A hand of cards is displayed. Work out the number of honour points in this hand and answer with the number keys.");
  def("24287775-cd60-416a-8f2a-6a39389991a5", 'projRoom',
    "Question 2 sur 4. Les quatre mains des joueurs sont affichées autour de la table.",
    "Question 2 of 4. The four players' hands are displayed around the table. Count each player's points and decide which team has the most points. Answer with the number keys.");
  def("7ea4ae19-6f61-4f68-891a-7ed08d7661ba", 'projRoom',
    "Question 3 sur 4. Les points sont calculés : l'équipe Nord-Sud a 26 points, l'équipe Est-Ouest 14 points. La table de décision des contrats est affichée.",
    "Question 3 of 4. The points are counted: the North-South team has 26 points, the East-West team 14. The contract decision table is displayed. The team with the most points commits to a contract: which one? Answer with the number keys.");
  def("67c44e35-27b4-47ef-b068-3516e3a472d9", 'projRoom',
    "Question 4 sur 4. Exercice : un texte à trous. Choisis les mots avec les touches chiffrées, puis valide avec V.",
    "Question 4 of 4. A fill-in-the-blanks exercise. Pick the words with the number keys, then press V to submit.");
  def("81fceed7-5feb-48c4-a861-ee555460db5c", 'robots',
    "Mission accomplie ! Tous les modules sont restaurés.",
    "Mission accomplished, agents! You reactivated the Protection Module. The corrupted robots are neutralised and the system is secure. BridgeBot is operational again: it understands the rules, cooperates with its partner and plans before playing. Thanks to you, Mini Bridge is saved. The network is stable. The program is running. The game can begin. Press 1 to continue.");
  def("a7c300e0-8afe-462f-b1c2-70e9645be4b0", 'robots',
    "La dernière page : place au jeu réel !",
    "The final page: time to move on to the real game!");
  def("4f3a68ab-6306-43f1-85f3-c4108aafbf75", 'exitRoom',
    "Page de sortie.",
    "Exit page. If you leave now, you will not restore BridgeBot and the secrets of Mini Bridge. Are you sure you want to stop the adventure? Press 1 to continue playing, or 2 to quit.");

  // rule popups
  const POPUPS = {
    "48384966-b026-4cc7-b471-7115ad86ba05": "Règle 5. ",
    "5770c88c-6dad-443c-bd95-27146b35f58b": "Règle 3. ",
    "62f493ba-1a5d-41fb-a261-e547ff37db54": "Règle 7. ",
    "8b023742-f1fb-45e9-98bf-758510772673": "Règle 4. ",
    "a2ebd7cf-6c3a-4bb9-bc25-2842813e0245": "Règle 6. ",
    "c54e8840-1afd-4692-99dd-0f7cfcc2ad63": "Règle 1. ",
    "cb91a57b-9ca4-4182-9eeb-bd7aa6aa7a58": "Règle 2. ",
    "fa35eda6-2353-47b7-a458-047e5beee455": "Règle 8. "
  };
  const POPUP_EN = {
    "48384966-b026-4cc7-b471-7115ad86ba05": "Rule 5. Careful: playing without wasting does not always mean keeping your big cards for the end! Answer to the exercise: East cannot win, so East plays a small card. South must play the Ace of spades, otherwise West wins with the King of spades.",
    "5770c88c-6dad-443c-bd95-27146b35f58b": "Rule 3. If you have no card of the requested suit, you discard a card of another suit, but it cannot win the trick. For example, if hearts are requested and you have none, your King of spades cannot win: better to throw a small card like the 2 of clubs.",
    "62f493ba-1a5d-41fb-a261-e547ff37db54": "Rule 7. Before the game starts, each player counts the points in their hand and adds them to their partner's. There are 40 points in total, shared between the two teams.",
    "8b023742-f1fb-45e9-98bf-758510772673": "Rule 4. Mini Bridge is a team game: play without wasting! Watch the cards your partner plays. If your partner is going to win the trick, do not waste your biggest card: keep it for later.",
    "a2ebd7cf-6c3a-4bb9-bc25-2842813e0245": "Rule 6. The lead is the first card played in the game. When it is on the table, the player to the left lays their hand face up and becomes the dummy for the whole game. Their partner decides which cards they play.",
    "cb91a57b-9ca4-4182-9eeb-bd7aa6aa7a58": "Rule 2. The player who played the strongest card wins the trick, and leads the next one. A trick is the set of 4 cards played, one per player; there are at most 13 tricks in a game. The goal is to win more tricks than your opponents.",
    "fa35eda6-2353-47b7-a458-047e5beee455": "Rule 8. The team with the most points commits to a contract: a number of tricks to win, chosen with the decision table. 20 to 22 points: 7 tricks. 23 to 24: 8 tricks. 25 to 26: 9 tricks. 27 to 29: 10 tricks. 30 to 32: 11 tricks. 33 to 36: 12 tricks. 37 to 40: 13 tricks."
  };
  POPUP_EN["c54e8840-1afd-4692-99dd-0f77dacf96ec"] =
    "Rule 1. You must follow the suit of the first card played on the table. For example, if a diamond is led, you must play a diamond from your hand if you have one.";
  for (const [id, label] of Object.entries(POPUPS)) {
    slides[id] = {
      fr: { pre: label + "Un écran de protocole s'affiche.", detail: SC.panel.fr },
      en: { full: POPUP_EN[id] || (label + "A protocol screen appears."), detail: SC.panel.en }
    };
  }

  const translate = {
    "Combien y a-t-il de couleurs dans le jeu de cartes du Mini Bridge ?": "How many suits are there in the Mini Bridge card deck?",
    "4 couleurs": "4 suits", "5 couleurs": "5 suits", "1 couleur": "1 suit", "2 couleurs": "2 suits",
    "Quelle est la carte la plus forte dans une couleur ?": "What is the strongest card in a suit?",
    "l'As": "the Ace", "le 10": "the 10", "le 2": "the 2", "le Roi": "the King",
    "Qui est le partenaire de Nord ?": "Who is North's partner?",
    "Est": "East", "Sud": "South", "Ouest": "West", "Nord": "North",
    "Remplissez les blancs avec les bonnes réponses.": "Fill in the blanks with the right answers.",
    "équipe": "team", "partenaire": "partner",
    "À votre avis, qui a gagné la levée ?": "In your opinion, who won the trick?",
    "défaussez": "discard", "carte": "card", "levée": "trick", "forte": "strong",
    "rejoue.": "plays again.", "couleur": "suit",
    "perdre": "lose", "grosse": "big", "gaspiller": "waste", "fin": "end",
    "gauche": "left", "visible": "face up", "décide": "decides", "entame": "lead", "endormi": "dummy",
    "Détermine le nombre de points d'honneur de cette main.": "Work out the number of honour points in this hand.",
    "15 points": "15 points", "14 points": "14 points", "13 points": "13 points", "12 points": "12 points",
    "Comptez les points de chaque joueur et déterminez l’équipe qui a le plus de points.": "Count each player's points and decide which team has the most points.",
    "Équipe Est-Ouest": "The East-West team", "Équipe Nord-Sud": "The North-South team",
    "L'équipe majoritaire en point, va s'engager sur un contrat. Lequel ?": "The team with the most points commits to a contract. Which one?",
    "20 à 22 points - 7 levées": "20 to 22 points - 7 tricks",
    "23 à 24 points - 8 levées": "23 to 24 points - 8 tricks",
    "25 à 26 points - 9 levées": "25 to 26 points - 9 tricks",
    "27 à 29 points - 10 levées": "27 to 29 points - 10 tricks",
    "30 à 32 points - 11 levées": "30 to 32 points - 11 tricks",
    "33 à 36 points - 12 levées": "33 to 36 points - 12 tricks",
    "l'entameur": "the leader", "le déclarant": "the declarer",
    "Bravo !": "Bravo!",
    "Bravo ! Vous êtes prêt.e.s pour la suite des aventures !": "Bravo! You are ready for the next adventures!",
    "Attention ! Clique sur l'oeil pour avoir un indice.": "Careful! Click the eye for a hint.",
    "Attention ! Regarde bien les cartes affichées.": "Careful! Look closely at the displayed cards.",
    "Attention ! Regarde bien l'image. Quel est le joueur placé en face du joueur Nord ?": "Careful! Look at the picture: which player sits opposite North?",
    "Attention ! Aide toi des images...": "Careful! Use the pictures to help you...",
    "Attention ! Regarde bien qui a posé la carte la plus forte.": "Careful! Look at who played the strongest card.",
    "Attention ! Rappelle toi des règles que l'on a découvert ensemble...": "Careful! Remember the rules we discovered together...",
    "Non, ce n'est pas le meilleur choix.": "No, that is not the best choice.",
    "Regarde bien les points donnés à chaque Honneur.": "Look at the points given to each honour.",
    "Attention ! Nord a 9 pts, Sud 17 pts, Est 5 pts et Ouest 8 pts.": "Careful! North has 9 points, South 17, East 5 and West 8.",
    "Attention ! Regarde les points de l'équipe majoritaire.": "Careful! Look at the points of the leading team.",
    "Aidez vous de la valeur des Honneurs et de l'indice.": "Use the honour values and the hint.",
    "Démarrer": "Start", "Continue": "Continue", "Je continue": "I keep playing", "J'arrête": "I stop"
  };

  return {
    title: {
      fr: "Mission BridgeBot : le protocole Mini Bridge.",
      en: "BridgeBot Mission: the Mini Bridge protocol."
    },
    slides: slides,
    labels: {
  "64e65052-9dac-4b70-bcdd-e9b68f7998c2": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "53bd5a65-c434-489d-bbe2-5b065394f195": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "5cc2f4f1-995b-42f1-ad0b-4070e330db53": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "e62bb70a-279f-4b4c-af0a-cad7c8414815": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "45f49400-059d-40a5-a9d3-d6f1803beb55": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "c38f7b01-21f8-4022-8bc5-653e530f2e82": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "fa284565-db0d-47da-b152-a98b2f39621d": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "ad2e6211-a90c-4f09-9858-65d0d3ce652f": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "956c2f40-491b-4827-8bcb-e94128760c0f": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "0caa03a4-3450-4870-8dc1-e191e2f58780": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "3b450aa5-2cff-485e-925c-fe3b4c9cadb3": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "d9f1fd64-61b2-4707-81fc-32f87c0e0c7c": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "994d4e81-f235-40ee-a582-ee54e332b0f4": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "6ab15a3d-4b41-4d64-bdf5-5954f2adfe36": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "b95e0d3f-c3b2-4312-9f08-3ef70aa0530e": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "23d3a05d-b8fe-40c0-b0eb-f45114aa00d7": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "a0043bdf-9f01-43ee-83d9-98a4a117c7bb": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "318f8e90-879b-4416-b384-957ebe81d281": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "add4dc5b-c747-4319-b897-91da71d17e02": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "820dd73f-cc4b-4bc0-ae0f-f855385ebd81": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "a2f0cdd4-e679-4436-8518-84dcb8a0b6fd": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "7293ad2c-3603-48a2-810d-9d14fbd23b17": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "4d013238-7334-45ac-9c6f-35b5c5cf8115": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "10c2ef9e-df64-4c57-8331-966933e2f128": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "666de7cf-9e65-4987-bf2c-4c3a3b1c6468": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "74824092-eb2b-4ff7-b67a-9cfc1d8dcc43": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "02930707-ff95-4a0c-9547-2420e7a632a2": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "e44f7daf-6717-499e-97ec-150dfb333c28": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "cfeec2ac-f0f9-447c-9264-6b51b356fca7": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "9450a351-33c5-4f69-8259-b7154378afa7": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "99374301-beea-4622-bf42-9174cb97154a": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "1fece509-0adc-41ac-940c-9de7a5bcc4ee": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "f41ca224-05ad-4663-b853-42f3473319d2": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "3de1768d-aa6c-4cfd-9d45-2b8c1db9a5c9": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "3043c686-ac26-4118-b95a-455ce1724f82": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "8eadf7a6-1c67-4a60-921a-8ef54983bf54": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "63fc2850-0c13-4add-ba17-0ac2afd06c7e": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "bb4c248e-f3ee-4282-a77c-8873141fafc1": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "53cc5a45-5ce7-44a9-bd29-d0e5ecc5f359": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "0935dfc1-f4d6-46e9-9adb-fa7602361d03": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "cbd9b772-217d-421f-9354-fb44b56335c8": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "33af094e-5d52-47f1-9e50-cc1b8c974ffa": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "b48ce477-4d32-4795-8991-718580f3b081": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "2865ca30-409d-4f9b-8f23-c7bde51c9219": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "498f9454-ab71-4eca-ae0f-bff15fb052f0": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "9941ea12-e395-4444-9c75-cad5f64c6b84": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "b4cacf05-12e2-4415-94ad-48041d2e3fe7": {
    "fr": "Lien : la page Facebook de la Fédération de Bridge",
    "en": "Link: the French Bridge Federation Facebook page"
  },
  "e52a3b47-56ed-4e41-81da-f7985d26191c": {
    "fr": "Lien : le compte Instagram de la Fédération",
    "en": "Link: the Federation's Instagram account"
  },
  "5a5409ac-58e9-4fb2-ac55-00ab159ce63b": {
    "fr": "Lien : une vidéo YouTube sur le Mini Bridge",
    "en": "Link: a YouTube video about Mini Bridge"
  },
  "05712587-94c6-46ea-8462-161a879fefc2": {
    "fr": "Lien : la page LinkedIn de la Fédération",
    "en": "Link: the Federation's LinkedIn page"
  },
  "2c7543bd-6905-43a4-b9eb-f484c22304ac": {
    "fr": "Quitter le jeu",
    "en": "Quit the game"
  },
  "cb81060a-4323-4ffa-ae86-5cc1e0a09be0": {
    "fr": "Lien : jouer une vraie partie sur Bridge Training",
    "en": "Link: play a real game on Bridge Training"
  },
  "96ae052c-27c4-4271-b8d0-82c991dfe99a": {
    "fr": "Lien : le bridge éducatif sur le site de la Fédération",
    "en": "Link: educational bridge on the Federation website"
  },
  "8f33e40b-8e0f-4d78-aa36-ca1a1459bc97": {
    "fr": "Arrêter et revenir à la couverture",
    "en": "Stop and go back to the cover"
  },
  "0a6d7ba7-1981-44b8-9673-b27e6e57f267": {
    "fr": "Reprendre le jeu",
    "en": "Back to the game"
  },
  "a2188f04-c922-42a6-8bf3-28c7aa3bac2c": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "87634527-2a63-46a6-b3e6-378bd28553bb": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "d5d5168f-6cf1-4943-a3a0-a5932c18b558": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "ae71ae08-6972-4e25-8d20-5b12bcbbe7c9": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "e451cd6f-358a-47d6-bb12-4b45c1bdbabd": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "5e659edc-5f84-48e1-8637-6e28808953c8": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "dd5c974d-767e-4dee-996a-d7663b03d4c3": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "543013d9-e968-4cc1-88a8-efc20967c506": {
    "fr": "Fermer la règle et continuer",
    "en": "Close the rule and continue"
  },
  "c1677145-62bc-44d3-bf5f-984ef0411eab": {
    "fr": "Démarrer le jeu",
    "en": "Start the game"
  },
  "d566efe4-69db-4c37-88b5-14fd42f41815": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "b92d289b-5148-4f5a-9ce0-2da46e006de8": {
    "fr": "Lire la règle 1",
    "en": "Read rule 1"
  },
  "4a0925a7-854c-403f-9f20-fdb1d8921b35": {
    "fr": "Lire la règle 2",
    "en": "Read rule 2"
  },
  "bf650153-e4c0-4c66-b520-09d444761cfc": {
    "fr": "Lire la règle 3",
    "en": "Read rule 3"
  },
  "703ab045-a14b-4f9f-9288-829f618cedbd": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "8e36a282-51dc-40c7-90ae-82628138ffa9": {
    "fr": "Lire la règle 4",
    "en": "Read rule 4"
  },
  "f862722d-8396-424d-9c02-3bde2381943f": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "83d80953-7a5c-4ba8-b0fd-07e464b70877": {
    "fr": "Lire la règle 5",
    "en": "Read rule 5"
  },
  "1665a299-dac5-4f48-b100-096204ae2ddc": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "d58a1f4b-6183-4a6f-afa7-8ad64109c8e0": {
    "fr": "Lire la règle 6",
    "en": "Read rule 6"
  },
  "47a0aa94-3763-443d-8145-cd803f3adac0": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "75b03037-77ba-49db-ac57-2d7b44105a62": {
    "fr": "Continuer, page suivante",
    "en": "Continue to the next page"
  },
  "ecb3b4c4-700a-4200-9cc3-ee22a74ac5c4": {
    "fr": "Lire la règle 7",
    "en": "Read rule 7"
  },
  "633d6506-ee35-40e1-a262-b686072232b7": {
    "fr": "Lire la règle 8",
    "en": "Read rule 8"
  }
},
    translate: translate
  };
})();
