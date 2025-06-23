const tapBox = document.getElementById("tap-box");

// Load saved count or set to 0
let tapCount = localStorage.getItem("tapCount");
tapCount = tapCount !== null ? tapCount : "0";
tapBox.innerText = tapCount;

// Detect spacebar key press
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // prevent page scroll
    if (!tapBox.isContentEditable) return;

    let current = tapBox.innerText;
    // Only increase if it's a number
    if (!isNaN(current)) {
      tapCount = (parseInt(current) + 1).toString();
      tapBox.innerText = tapCount;
      localStorage.setItem("tapCount", tapCount);
    }
  } else if (e.code === "Backspace") {
    e.preventDefault();
    tapBox.innerText = "0";
    localStorage.setItem("tapCount", "0");
  } else if (e.key.match(/^[0-9]$/)) {
    e.preventDefault();
    let current = tapBox.innerText;
    tapCount = current === "0" ? e.key : current + e.key;
    tapBox.innerText = tapCount;
    localStorage.setItem("tapCount", tapCount);
  }
});

// Save edits if user changes the value directly
tapBox.addEventListener("input", () => {
  let newValue = tapBox.innerText.replace(/\D/g, "");
  tapBox.innerText = newValue || "0";
  localStorage.setItem("tapCount", tapBox.innerText);
});
