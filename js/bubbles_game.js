const bubbleContainer = document.getElementById("bubble-container");

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("smallbubble");

  // Smaller size: 5px to 15px
  const size = Math.random() * 10 + 5;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random horizontal position
  bubble.style.left = `${Math.random() * 100}%`;

  // Shorter animation (3–6s)
  bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;

  bubbleContainer.appendChild(bubble);

  bubble.addEventListener("animationend", () => bubble.remove());
}

// Generate fewer bubbles at the beginning
for (let i = 0; i < 10; i++) {
  setTimeout(createBubble, i * 200);
}

// Infinite generation every 300–700ms
setInterval(() => {
  createBubble();
}, Math.random() * 400 + 300);
