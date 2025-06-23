const tapCountEl = document.getElementById("tap-count");
const tapInstruction = document.getElementById("tap-instruction");

// Load from localStorage or default to 0
let tapCount = localStorage.getItem("tapCount");
tapCount = tapCount !== null ? tapCount : "0";
tapCountEl.innerText = tapCount;
toggleInstruction();

// Handle key presses
document.addEventListener("keydown", (e) => {
  const current = tapCountEl.innerText;

  // Ignore input if count box isn't focused or input isn't numeric
  if (e.code === "Space") {
    e.preventDefault();
    tapCount = (parseInt(current || "0") + 1).toString();
    tapCountEl.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  } else if (e.code === "Backspace") {
    e.preventDefault();
    tapCount = "0";
    tapCountEl.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  } else if (e.key.match(/^[0-9]$/)) {
    e.preventDefault();
    tapCount = current === "0" ? e.key : current + e.key;
    tapCountEl.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  }

  toggleInstruction();
});

// Update localStorage when edited manually
tapCountEl.addEventListener("input", () => {
  let value = tapCountEl.innerText.replace(/\D/g, ""); // keep digits only
  if (value === "") value = "0";
  tapCountEl.innerText = value;
  localStorage.setItem("tapCount", value);
  toggleInstruction();
});

// Hide instruction when count is not empty or 0
function toggleInstruction() {
  tapInstruction.style.display = tapCountEl.innerText === "0" ? "block" : "none";
}
