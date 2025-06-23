const tapBox = document.getElementById("tap-box");
const counterInput = document.getElementById("counter");

// Load saved count
let count = localStorage.getItem("tapCount") || "0";
counterInput.value = count;

// Focusable for key events
tapBox.focus();

// Spacebar tap listener
document.addEventListener("keydown", (e) => {
  if (document.activeElement === counterInput) return; // don't count if editing

  if (e.code === "Space") {
    e.preventDefault();
    count = (parseInt(count) + 1).toString();
    counterInput.value = count;
    localStorage.setItem("tapCount", count);
  }
});

// Update localStorage when input changes manually
counterInput.addEventListener("input", () => {
  let val = counterInput.value;

  // Remove any non-numeric characters
  val = val.replace(/[^\d]/g, "");

  // If input is empty after removal, default to 0
  if (val === "") val = "0";

  counterInput.value = val;
  count = val;
  localStorage.setItem("tapCount", count);
});

// Handle backspace to set to 0 if only one digit
counterInput.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" && counterInput.value.length === 1) {
    e.preventDefault();
    counterInput.value = "0";
    count = "0";
    localStorage.setItem("tapCount", count);
  }
});

// Replace "0" with new digit if typing while "0" is showing
counterInput.addEventListener("keypress", (e) => {
  if (counterInput.value === "0" && /[0-9]/.test(e.key)) {
    e.preventDefault();
    counterInput.value = e.key;
    count = e.key;
    localStorage.setItem("tapCount", count);
  }
});
