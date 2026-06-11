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
