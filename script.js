const tapBox = document.getElementById('tapBox');
const tapInput = document.getElementById('tapCount');

let tapCount = 0;

function saveToLocalStorage(value) {
  localStorage.setItem('tapCount', value);
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('tapCount');
  return stored !== null ? parseInt(stored, 10) : 0;
}

function updateDisplay() {
  tapInput.value = tapCount.toString();
}

// Prevent unwanted input (e.g., touchpad/mouse click)
tapBox.addEventListener('mousedown', e => {
  e.preventDefault(); // Disable touchpad clicks
});

// Allow only number input, backspace, editing
tapInput.addEventListener('keydown', e => {
  if (e.key === 'Backspace') {
    e.preventDefault();
    if (tapInput.value.length <= 1) {
      tapCount = 0;
    } else {
      tapCount = parseInt(tapInput.value.slice(0, -1), 10);
    }
    saveToLocalStorage(tapCount);
    updateDisplay();
  } else if (!isNaN(e.key) && e.key !== ' ') {
    e.preventDefault();
    const current = tapInput.value === "0" ? "" : tapInput.value;
    tapCount = parseInt(current + e.key, 10);
    saveToLocalStorage(tapCount);
    updateDisplay();
  }
});

// Spacebar tap counter
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    tapCount++;
    saveToLocalStorage(tapCount);
    updateDisplay();
  }
});

tapBox.addEventListener('click', () => {
  tapInput.focus();
});

// Init on load
window.addEventListener('load', () => {
  tapCount = loadFromLocalStorage();
  updateDisplay();
  tapInput.focus();
});
