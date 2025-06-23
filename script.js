const tapCountEl = document.getElementById("tap-count");
const tapInstruction = document.getElementById("tap-instruction");

// Load saved count from localStorage or default to "0"
let tapCount = localStorage.getItem("tapCount") || "0";
tapCountEl.innerText = tapCount;
toggleInstruction();

// Listen for key presses (only spacebar or number keys allowed)
document.addEventListener("keydown", (e) => {
  const current = tapCountEl.innerText;

  // Only respond to actual keyboard input
  if (e.code === "Space") {
    e.preventDefault(); // prevent scrolling
    tapCount = (parseInt(current || "0") + 1).toString();
    tapCountEl.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  } else if (e.code === "Backspace") {
    e.preventDefault();
    // If it's a single digit or empty, set to 0
    tapCount = "0";
    tapCountEl.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  } else if (e.key.match(/^[0-9]$/)) {
    e.preventDefault();
    // Replace 0 with new digit, otherwise append
    tapCount = current === "0" ? e.key : current + e.key;
    tapCountEl.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  }

  toggleInstruction();
});

// Handle manual edits in the contenteditable field
tapCountEl.addEventListener("input", () => {
  let value = tapCountEl.innerText.replace(/\D/g, ""); // only digits
  if (value === "") value = "0";
  tapCountEl.innerText = value;
  localStorage.setItem("tapCount", value);
  toggleInstruction();
});

// Show or hide the instruction text
function toggleInstruction() {
  tapInstruction.style.display = tapCountEl.innerText === "0" ? "block" : "none";
}
