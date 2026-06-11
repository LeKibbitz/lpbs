// UI strings of the audio guide (FR/EN), written to be spoken aloud.
// Single source shared by content.js at runtime and by
// tools/extract_segments.mjs at build time (audio pre-generation).
window.PBA_STRINGS = {
  fr: {
    welcome: "Bonjour ! Je suis ton guide audio pour le Petit Bridge.",
    help: "Voici comment on joue ensemble. Touche R : je répète la description de la page. Touche Q : je relis la question et les réponses. Touches 1 à 9 : tu choisis une réponse ou tu actives un bouton. Touche L : je te liste tous les boutons de la page. Touche V : tu valides l'exercice. Touche C : tu me poses une question à voix haute, et je te réponds. Touche S ou Échap : je me tais. Touche T : on passe en anglais, ou on revient en français. Et les touches plus et moins changent la vitesse de ma voix.",
    page: (o, t) => `Page ${o} sur ${t}.`,
    question: "Question :",
    options: "Voici les réponses possibles.",
    words: "Voici les mots à placer.",
    items: n => n > 1
      ? `Il y a ${n} boutons sur cette page. Appuie sur L pour la liste, ou sur un chiffre pour choisir.`
      : "Il y a un bouton sur cette page. Appuie sur 1 pour l'activer.",
    listIntro: "Éléments de la page :",
    noItem: "Hmm, il n'y a rien à ce numéro. Appuie sur L pour entendre la liste.",
    noQuestion: "Il n'y a pas de question sur cette page.",
    submitted: "C'est parti, réponse envoyée !",
    noSubmit: "Je ne vois pas de bouton de validation sur cette page.",
    grabbed: "Tu la tiens ! Choisis maintenant le chiffre d'une zone pour la poser.",
    dropped: "Et voilà, posé sur la table.",
    langName: "On continue en français !",
    rate: r => `Vitesse ${r.toFixed(1).replace('.', ',')}`,
    link: "lien",
    interactiveItem: n => `élément interactif ${n}`,
    dragObj: n => `objet déplaçable ${n}`,
    dropZone: n => `zone de dépôt ${n}`,
    listening: "Je t'écoute ! Pose ta question.",
    thinking: "Bonne question, laisse-moi réfléchir.",
    askNoMic: "Désolé, la reconnaissance vocale n'est pas disponible dans ce navigateur.",
    askHeardNothing: "Je n'ai rien entendu. Appuie sur C pour réessayer.",
    askFailed: "Désolé, je n'ai pas réussi à réfléchir. Vérifie la connexion ou la clé API, et réessaie."
  },
  en: {
    welcome: "Hello! I'm your audio guide for Petit Bridge.",
    help: "Here is how we play together. Key R: I repeat the page description. Key Q: I read the question and the answers again. Keys 1 to 9: you pick an answer or press a button. Key L: I list all the buttons on the page. Key V: you submit the exercise. Key C: you ask me a question out loud, and I answer. Key S or Escape: I stay quiet. Key T: we switch to French, or back to English. And the plus and minus keys change how fast I speak.",
    page: (o, t) => `Page ${o} of ${t}.`,
    question: "Question:",
    options: "Here are the possible answers.",
    words: "Here are the words to place.",
    items: n => n > 1
      ? `There are ${n} buttons on this page. Press L for the list, or a number key to choose.`
      : "There is one button on this page. Press 1 to use it.",
    listIntro: "Elements on this page:",
    noItem: "Hmm, there is nothing at that number. Press L to hear the list.",
    noQuestion: "There is no question on this page.",
    submitted: "Here we go, answer sent!",
    noSubmit: "I can't find a submit button on this page.",
    grabbed: "You're holding it! Now press the number of a drop zone to place it.",
    dropped: "And there it is, placed on the table.",
    langName: "Let's continue in English!",
    rate: r => `Speed ${r.toFixed(1)}`,
    link: "link",
    interactiveItem: n => `interactive element ${n}`,
    dragObj: n => `movable object ${n}`,
    dropZone: n => `drop zone ${n}`,
    listening: "I'm listening! Ask your question.",
    thinking: "Good question, let me think.",
    askNoMic: "Sorry, speech recognition is not available in this browser.",
    askHeardNothing: "I didn't hear anything. Press C to try again.",
    askFailed: "Sorry, I couldn't think that one through. Check the connection or the API key, and try again."
  }
};
