const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const boostSprite = document.getElementById("fish-player");
const playerSprite = document.getElementById("poisson-other");
const bubbles = [];

//! Fonction pour redimensionner le canvas en fonction de la taille de la fenêtre
function resizeCanvas() {
  // Volé de stackoverflow pour gérer les écrans
  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight * 0.45; // équivalent de 50vh en css

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  // Important : remet l'échelle à 1 unité logique = 1 pixel CSS
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


//! Charger le script Player.js d'abord
const playerScript = document.createElement('script');
playerScript.src = './js/Player.js';
playerScript.onload = () => {
  // échelle du poisson
  const scale = 0.13;

  const fishWidth = playerSprite.naturalWidth * scale;
  const fishHeight = playerSprite.naturalHeight * scale;
  
  // Créer le joueur (coordonnées en pixels CSS)
  const player = new Player(
    playerSprite,
    boostSprite,
    canvas.clientWidth / 2,
    canvas.clientHeight / 2,
    fishWidth,
    fishHeight,
    5
  );


  // Contrôles clavier
  document.addEventListener("keydown", e => {
    switch(e.key) {
      case "ArrowLeft":
        player.setControl('left', true);
        break;
      case "ArrowRight":
        player.setControl('right', true);
        break;
      case "ArrowUp":
        player.setControl('forward', true);
        break;
      case "ArrowDown":
        player.setControl('backward', true);
        break;
      case "Shift":
        player.setControl('boost', true);
        break;
    }
  });

  document.addEventListener("keyup", e => {
    switch(e.key) {
      case "ArrowLeft":
        player.setControl('left', false);
        break;
      case "ArrowRight":
        player.setControl('right', false);
        break;
      case "ArrowUp":
        player.setControl('forward', false);
        break;
      case "ArrowDown":
        player.setControl('backward', false);
        break;
      case "Shift":
        player.setControl('boost', false);
        break;
    }
  });

  // Boucle de jeu
  function gameLoop() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    // Mettre à jour le joueur
    player.update(canvas.clientWidth, canvas.clientHeight);
    
    // Générer des bulles uniquement pendant le boost
    if (player.controls.boost) {
      const nose = player.getNosePosition();

      bubbles.push(
        new Bubble(
          nose.x - Math.cos(player.angle) * player.width,
          nose.y - Math.sin(player.angle) * player.width,
          player.angle
        )
      );
    }
    // Mettre à jour et dessiner les bulles
    for (let i = bubbles.length - 1; i >= 0; i--) {
      bubbles[i].update();
      bubbles[i].draw(ctx);
      // Supprimer les bulles "mortes"
      if (bubbles[i].isDead()) {
        bubbles.splice(i, 1);
      }
    }

    // Dessiner le joueur
    player.draw(ctx);
    
    //! TODO: Ajouter la logique du bateau ennemi ici
    
    // Continuer la boucle
    requestAnimationFrame(gameLoop);
  }

  // Démarrer le jeu
  gameLoop();
};

document.head.appendChild(playerScript);
