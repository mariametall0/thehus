/* ==========================================================
   INTERACTIVITÉ DU DATE ROMANTIQUE (STYLE VIRAL TIKTOK)
   ========================================================== */

// Données choisies par le/la partenaire
const dateData = {
  mood: "En pleine forme ✨",
  food: "Des sushis 🍣",
  plan: "Film / Série sous le plaid 🎬",
  note: ""
};

let noClickCount = 0;

const funnyRefusalPhrases = [
  "Tu es bien sûr(e) mon amour ? 🥺",
  "Attends, ton doigt a glissé non ? 💔",
  "Regarde le chaton comme il est triste 😭",
  "Mais... on est déjà ensemble en plus ! 🥺",
  "Allez s'il te plaît mon cœur... 👉👈",
  "Impossible, tu m'aimes beaucoup trop pour dire non ! 😉",
  "Erreur 404 : Le bouton NON est en panne 💕",
  "Le destin a dit OUI de toute façon ! 🥰"
];

// Effets sonores mignons (Web Audio API)
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playSound(type) {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;

    if (type === 'pop') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'yay') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.12, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.25);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } else if (type === 'cry') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.25);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {}
}

// Cœurs d'arrière-plan
function initBackgroundHearts() {
  const sky = document.getElementById('heartsSky');
  if (!sky) return;
  const icons = ['💖', '💕', '✨', '🌸', '🤍', '🧸'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'sky-heart';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.animationDelay = `${Math.random() * 6}s`;
    el.style.animationDuration = `${5 + Math.random() * 5}s`;
    el.style.fontSize = `${14 + Math.random() * 18}px`;
    sky.appendChild(el);
  }
}

// Confettis de fête
function spawnConfetti(count = 40) {
  const icons = ['🎉', '💖', '✨', '💋', '🌸', '💕', '🥰'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'party-pop';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${Math.random() * 96}vw`;
    el.style.animationDuration = `${1.4 + Math.random() * 1.5}s`;
    el.style.animationDelay = `${Math.random() * 0.4}s`;
    el.style.fontSize = `${20 + Math.random() * 26}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }
}

// Animation larmes sur le chat SVG
function setCatSad(isSad) {
  const catBox = document.getElementById('catBox');
  const pleaseText = document.getElementById('pleaseText');
  
  if (isSad) {
    if (pleaseText) pleaseText.textContent = "S ' I L   T E   P L A Î T   🥺";
    // Ajout visuel de larmes si pas déjà présentes
    if (!document.getElementById('catTears')) {
      const svg = document.getElementById('catSvg');
      const tears = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      tears.setAttribute('id', 'catTears');
      tears.innerHTML = `
        <ellipse cx="68" cy="118" rx="6" ry="10" fill="#4ea8de" opacity="0.85" />
        <ellipse cx="132" cy="118" rx="6" ry="10" fill="#4ea8de" opacity="0.85" />
      `;
      svg.appendChild(tears);
    }
  } else {
    if (pleaseText) pleaseText.textContent = "P L E A S E";
    const tears = document.getElementById('catTears');
    if (tears) tears.remove();
  }
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundHearts();

  const envelopeBtn = document.getElementById('envelopeBtn');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const mainCard = document.getElementById('mainCard');

  // 1. Clic sur l'enveloppe
  if (envelopeBtn) {
    envelopeBtn.addEventListener('click', () => {
      playSound('pop');
      envelopeBtn.style.transform = 'scale(0.85)';
      setTimeout(() => {
        envelopeScreen.style.display = 'none';
        mainCard.classList.remove('hidden');
        spawnConfetti(20);
      }, 300);
    });
  }

  // 2. Gestion virale du bouton NON et OUI
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const noHint = document.getElementById('noHint');

  if (noBtn && yesBtn) {
    noBtn.addEventListener('click', () => {
      playSound('cry');
      noClickCount++;
      setCatSad(true);

      // Changement du message rigolo
      const phrase = funnyRefusalPhrases[(noClickCount - 1) % funnyRefusalPhrases.length];
      if (noHint) noHint.textContent = phrase;

      // Le bouton OUI grossit à vue d'œil !
      const newScale = 1 + (noClickCount * 0.28);
      yesBtn.style.transform = `scale(${newScale})`;
      yesBtn.style.zIndex = '10';

      // Le bouton NON rétrécit ou bouge un peu
      const noScale = Math.max(0.65, 1 - (noClickCount * 0.08));
      noBtn.style.transform = `scale(${noScale})`;

      if (noClickCount >= 6) {
        noBtn.style.display = 'none'; // Le bouton disparaît totalement !
      }
    });

    // 3. Clic sur OUI 💕
    yesBtn.addEventListener('click', () => {
      playSound('yay');
      spawnConfetti(50);
      setCatSad(false);

      // Passage à l'écran de personnalisation
      document.getElementById('dateProposalStep').classList.remove('active');
      document.getElementById('dateCustomizerStep').classList.add('active');
    });
  }

  // 4. Sélection des chips de personnalisation
  setupChipsSelection();

  // 5. Bouton "Confirmer notre date"
  const generateSummaryBtn = document.getElementById('generateSummaryBtn');
  if (generateSummaryBtn) {
    generateSummaryBtn.addEventListener('click', () => {
      playSound('yay');
      spawnConfetti(35);

      const noteVal = document.getElementById('loveMessage')?.value.trim();
      dateData.note = noteVal;

      buildDateTicket();

      document.getElementById('dateCustomizerStep').classList.remove('active');
      document.getElementById('recapStep').classList.add('active');
    });
  }

  // 6. Reset
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      noClickCount = 0;
      yesBtn.style.transform = 'scale(1)';
      noBtn.style.transform = 'scale(1)';
      noBtn.style.display = 'inline-flex';
      if (noHint) noHint.textContent = '';
      setCatSad(false);

      document.getElementById('recapStep').classList.remove('active');
      document.getElementById('dateProposalStep').classList.add('active');
    });
  }
});

// Gestion des chips de sélection (Humeur, Repas, Programme)
function setupChipsSelection() {
  const chips = document.querySelectorAll('.sticker-chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      playSound('pop');
      const group = chip.dataset.group;
      const value = chip.dataset.value;

      // Désactiver les autres chips du même groupe
      document.querySelectorAll(`.sticker-chip[data-group="${group}"]`).forEach(c => {
        c.classList.remove('active');
      });

      chip.classList.add('active');

      if (group === 'mood') dateData.mood = value;
      if (group === 'food') dateData.food = value;
      if (group === 'plan') dateData.plan = value;
    });
  });
}

// Génération du ticket et des liens WhatsApp / Copier
function buildDateTicket() {
  const ticketEl = document.getElementById('dateTicket');
  if (!ticketEl) return;

  const noteDisplay = dateData.note 
    ? `<div class="ticket-row"><span class="ticket-label">💌 Mon petit mot :</span> « ${dateData.note} »</div>`
    : '';

  ticketEl.innerHTML = `
    <div class="ticket-row"><span class="ticket-label">💖 Statut :</span> Date 100% accepté avec amour !</div>
    <div class="ticket-row"><span class="ticket-label">💭 Mon humeur :</span> ${dateData.mood}</div>
    <div class="ticket-row"><span class="ticket-label">🍽️ Au menu :</span> ${dateData.food}</div>
    <div class="ticket-row"><span class="ticket-label">🎬 Notre programme :</span> ${dateData.plan}</div>
    ${noteDisplay}
  `;

  // Message WhatsApp formaté proprement
  const whatsappMessage = 
`💌 *J'ai dit OUI pour notre Date en amoureux !* 💕🥰

💭 *Mon humeur :* ${dateData.mood}
🍽️ *Ce qu'on mange :* ${dateData.food}
🎬 *Le programme :* ${dateData.plan}
${dateData.note ? `\n💬 *Mon petit mot :* « ${dateData.note} »\n` : ''}
Trop hâte d'être avec toi mon amour ! 💖✨`;

  // WhatsApp Button
  const waBtn = document.getElementById('whatsappBtn');
  if (waBtn) {
    waBtn.onclick = () => {
      playSound('yay');
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(url, '_blank');
    };
  }

  // Copier dans le presse-papier
  const copyBtn = document.getElementById('copyTextBtn');
  const alertEl = document.getElementById('copyAlert');
  if (copyBtn) {
    copyBtn.onclick = () => {
      playSound('pop');
      navigator.clipboard.writeText(whatsappMessage).then(() => {
        if (alertEl) {
          alertEl.style.display = 'block';
          setTimeout(() => alertEl.style.display = 'none', 2500);
        }
      });
    };
  }
}
