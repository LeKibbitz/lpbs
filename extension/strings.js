// UI strings of the audio guide (FR/EN), written to be spoken aloud.
// Single source shared by content.js at runtime and by
// tools/extract_segments.mjs at build time (audio pre-generation).
window.PBA_STRINGS = {
  fr: {
    welcome: "Bonjour ! Je suis ton guide audio.",
    help: "Voici comment on joue ensemble. À chaque page, je lis ce qui est affiché, puis je t'annonce le nombre de boutons. Touche L : je liste les boutons avec leur numéro. Touches 1 à 9 : tu actives le bouton ou la réponse de ce numéro. Touche R : je répète la page. Touche Q : je relis la question et les réponses. Touche V : tu valides l'exercice. Touche D : je décris le décor. Touche C : tu me poses une question avec ta voix, et je te réponds. Touche S ou Échap : je me tais. Touche T : on passe en anglais, ou on revient en français. Touches plus et moins : je parle plus vite ou plus lentement.",
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
    askHeardNothing: "Je n'ai rien entendu. Appuie sur C et pose ta question juste après que je dis : je t'écoute.",
    micDenied: "Le micro n'est pas autorisé pour ce site. Demande à un adulte de cliquer sur l'icône à gauche de l'adresse de la page, et d'autoriser le micro.",
    micMissing: "Je ne trouve pas de micro sur cet ordinateur.",
    micNetwork: "La reconnaissance vocale n'a pas répondu. Vérifie la connexion internet et réessaie.",
    noDetail: "Je n'ai pas de description du décor pour cette page.",
    askFailed: "Désolé, je n'ai pas réussi à réfléchir. Vérifie la connexion, et réessaie."
  },
  en: {
    welcome: "Hello! I'm your audio guide.",
    help: "Here is how we play together. On each page I read what is displayed, then I tell you how many buttons there are. Key L: I list the buttons with their numbers. Keys 1 to 9: you press the button or answer with that number. Key R: I repeat the page. Key Q: I read the question and the answers again. Key V: you submit the exercise. Key D: I describe the scenery. Key C: you ask me a question with your voice, and I answer. Key S or Escape: I stay quiet. Key T: we switch to French, or back to English. Plus and minus keys: I speak faster or slower.",
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
    askHeardNothing: "I didn't hear anything. Press C and ask your question right after I say: I'm listening.",
    micDenied: "The microphone is not allowed for this site. Ask an adult to click the icon left of the page address and allow the microphone.",
    micMissing: "I can't find a microphone on this computer.",
    micNetwork: "Speech recognition did not respond. Check the internet connection and try again.",
    noDetail: "I have no scenery description for this page.",
    askFailed: "Sorry, I couldn't think that one through. Check the connection and try again."
  }
};
