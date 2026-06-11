const DEFAULTS = { enabled: true, lang: 'fr', rate: 1.0 };
let settings = { ...DEFAULTS };

const toggleBtn = document.getElementById('toggle');
const langSel = document.getElementById('lang');
const rateInput = document.getElementById('rate');

function render() {
  toggleBtn.textContent = settings.enabled ? 'Voix activée — cliquer pour couper' : 'Voix coupée — cliquer pour activer';
  toggleBtn.classList.toggle('off', !settings.enabled);
  langSel.value = settings.lang;
  rateInput.value = settings.rate;
}

function save() {
  chrome.storage.sync.set({ pba: settings });
}

chrome.storage.sync.get('pba', data => {
  if (data && data.pba) settings = { ...DEFAULTS, ...data.pba };
  render();
});

toggleBtn.addEventListener('click', () => {
  settings.enabled = !settings.enabled;
  save(); render();
});

langSel.addEventListener('change', () => {
  settings.lang = langSel.value;
  save();
});

rateInput.addEventListener('input', () => {
  settings.rate = parseFloat(rateInput.value);
  save();
});

// The conversational mode (key C) always goes through the guide's relay
// server; clear any personal API key left over from older versions.
chrome.storage.sync.remove('pbaKey');
