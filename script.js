const tapBox = document.getElementById('tapBox');
const tapInput = document.getElementById('tapCount');

let tapCount = 0;
let spacePressed = false;
let touchStarted = false;

// Load from localStorage
function loadTapCount() {
  const stored = localStorage.getItem('tapCount');
  return stored !== null ? parseInt(stored, 10) : 0;
}

// Save to localStorage
function saveTapCount(value) {
  localStorage.setItem('tapCount', value);
}

// Update UI input field
function updateDisplay() {
  tapInput.value = tapCount.toString();
}

// Prevent mouse from acting as a tap
tapBox.addEventListener('mousedown', (e) => {
  e.preventDefault(); // ignore mouse clicks / touchpad
});

// Tap via spacebar: only register one tap per full press
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !spacePressed) {
    e.preventDefault();
    spacePressed = true;
    tapCount++;
    saveTapCount(tapCount);
    updateDisplay();
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    spacePressed = false;
  }
});

// Tap via touch: only count once per touch cycle
tapBox.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!touchStarted) {
    touchStarted = true;
    tapCount++;
    saveTapCount(tapCount);
    updateDisplay();
  }
});

tapBox.addEventListener('touchend', () => {
  touchStarted = false;
});

// Focus the input when the user clicks/taps
tapBox.addEventListener('click', () => {
  tapInput.focus();
});

// Manual counter editing + backspace & leading-zero behavior
tapInput.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    e.preventDefault();
    if (tapInput.value.length <= 1) {
      tapCount = 0;
    } else {
      tapCount = parseInt(tapInput.value.slice(0, -1), 10);
    }
    saveTapCount(tapCount);
    updateDisplay();
  } else if (!isNaN(e.key) && e.key !== ' ') {
    e.preventDefault();
    const current = tapInput.value === "0" ? "" : tapInput.value;
    tapCount = parseInt(current + e.key, 10);
    saveTapCount(tapCount);
    updateDisplay();
  }
});

// Initialize app
window.addEventListener('load', () => {
  tapCount = loadTapCount();
  updateDisplay();
  tapInput.focus();
});
