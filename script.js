// ============ PAGE NAVIGATION ============
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

document.getElementById('yesBtn').addEventListener('click', () => {
  showScreen('screen-2');
});

document.getElementById('nextBtn').addEventListener('click', () => {
  showScreen('screen-3');
});

// ============ THE "NO" BUTTON ============
const noBtn   = document.getElementById('noBtn');
const yesBtn  = document.getElementById('yesBtn');
const flashEl = document.getElementById('flashMsg');

const messages = [
  "Stop Lying",
  "Seriously?",
  "Still No?",
  "You're So Bad",
  "Don't You Feel Pity?"
];

let jumpCount = 0;
const TOTAL_JUMPS = 6;

function flashMessage(text){
  flashEl.textContent = text;
  flashEl.classList.add('show');
  window.setTimeout(() => flashEl.classList.remove('show'), 850);
}

function randomPosition(btnRect){
  const margin = 20;
  const maxX = window.innerWidth  - btnRect.width  - margin;
  const maxY = window.innerHeight - btnRect.height - margin;
  const x = Math.max(margin, Math.random() * maxX);
  const y = Math.max(margin, Math.random() * maxY);
  return { x, y };
}

noBtn.addEventListener('click', () => {
  if (jumpCount >= TOTAL_JUMPS) return; // already vanished, ignore

  jumpCount++;

  // on the very first click, switch from normal flow into free-floating fixed
  // positioning, anchored to wherever it currently sits, so it doesn't jump/snap
  if (jumpCount === 1){
    const rect = noBtn.getBoundingClientRect();
    noBtn.classList.add('jumping');
    noBtn.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
    void noBtn.offsetWidth; // force reflow before the jump below animates
  }

  const rect = noBtn.getBoundingClientRect();
  const { x, y } = randomPosition(rect);
  const scale = Math.max(1 - jumpCount * 0.15, 0.15);
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

  if (jumpCount <= messages.length){
    flashMessage(messages[jumpCount - 1]);
  }

  if (jumpCount >= TOTAL_JUMPS){
    // that was the last click: fade out and remove for good
    window.setTimeout(() => {
      noBtn.style.opacity = '0';
      window.setTimeout(() => {
        noBtn.style.display = 'none';
        yesBtn.classList.add('pulse');
      }, 400);
    }, 250);
  }
});
