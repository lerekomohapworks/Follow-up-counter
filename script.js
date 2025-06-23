const tapBox = document.getElementById('tapBox');
const tapInput = document.getElementById('tapCount');
let tapCount = 0;
let spacePressed = false;
let touchStarted = false;

function loadTapCount() {
  const stored = localStorage.getItem('tapCount');
  return stored !== null ? parseInt(stored, 10) : 0;
}

function saveTapCount(value) {
  localStorage.setItem('tapCount', value);
}

function updateDisplay() {
  tapInput.value = tapCount.toString();
}

// Increase tap ONLY if tap wasn't on the input
tapBox.addEventListener('click', (e) => {
  if (e.target !== tapInput) {
    tapInput.blur(); // hide keyboard on mobile
    tapCount++;
    saveTapCount(tapCount);
    updateDisplay();
  }
});

// Handle spacebar on desktop
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

// Touch-only tap counter logic
tapBox.addEventListener('touchstart', (e) => {
  if (e.target !== tapInput && !touchStarted) {
    touchStarted = true;
    tapInput.blur(); // hide keyboard
    tapCount++;
    saveTapCount(tapCount);
    updateDisplay();
  }
});

tapBox.addEventListener('touchend', () => {
  touchStarted = false;
});

// Allow backspace + manual input
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

// Init
window.addEventListener('load', () => {
  tapCount = loadTapCount();
  updateDisplay();
});
