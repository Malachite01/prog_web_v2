const bubbleContainer = document.getElementById("bubble-container");

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Taille aléatoire
  const size = Math.random() * 80 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Position horizontale aléatoire
  bubble.style.left = `${Math.random() * 100}%`;

  // Durée d'animation aléatoire
  bubble.style.animationDuration = `${Math.random() * 5 + 4}s`; // 4s to 9s

  bubbleContainer.appendChild(bubble);

  // Supprimer la bulle après l'animation
  bubble.addEventListener("animationend", () => bubble.remove());
}

// Générer beaucoup de bulles au chargement de la page
for (let i = 0; i < 50; i++) {
  setTimeout(createBubble, i * 100); // Espacer la création des bulles
}
