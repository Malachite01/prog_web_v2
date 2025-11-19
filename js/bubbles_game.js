const bubbleContainer = document.getElementById("bubble-container");

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("smallbubble");

  // Plus petites tailles
  const size = Math.random() * 10 + 5;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Position horizontale aléatoire
  bubble.style.left = `${Math.random() * 100}%`;

  // Durée d'animation plus courte (3–6s)
  bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;

  bubbleContainer.appendChild(bubble);

  bubble.addEventListener("animationend", () => bubble.remove());
}

// Générer moins de bulles au début
for (let i = 0; i < 80; i++) {
  setTimeout(createBubble, i * 200);
}

// Génération infinie toutes les 300–700ms
setInterval(() => {
  createBubble();
}, Math.random() * 400 + 300);
