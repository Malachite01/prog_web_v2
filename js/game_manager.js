// Zone de jeu
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
//Joueur
const boostSprite = document.getElementById("fish-player");
const playerSprite = document.getElementById("poisson-other");
const bubbles = [];
//Ennemy
const netSprite = new Image();
netSprite.src = './assets/enemy/net.webp';
// Tableau pour stocker les filets actifs
let nets = [];
// Timer pour spawner les filets régulièrement
let netSpawnTimer = 0;
const netSpawnInterval = 120; // Spawner un filet toutes les 120 frames (2 secondes à 60fps)


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
        player.setControl('backward', true);
        break;
      case "ArrowRight":
        player.setControl('forward', true);
        break;
      case "ArrowUp":
        player.setControl('left', true);
        break;
      case "ArrowDown":
        player.setControl('right', true);
        break;
      case "Shift":
        player.setControl('boost', true);
        break;
    }
  });

  document.addEventListener("keyup", e => {
    switch(e.key) {
      case "ArrowLeft":
        player.setControl('backward', false);
        break;
      case "ArrowRight":
        player.setControl('forward', false);
        break;
      case "ArrowUp":
        player.setControl('left', false);
        break;
      case "ArrowDown":
        player.setControl('right', false);
        break;
      case "Shift":
        player.setControl('boost', false);
        break;
    }
  });




  // --------------
  //! Boucle de jeu
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

    // Spawner des filets régulièrement
    netSpawnTimer++;
    if (netSpawnTimer >= netSpawnInterval) {
      netSpawnTimer = 0;
      
      // Créer un filet qui vise la position actuelle du joueur
      nets.push(
        new Net(
          netSprite,
          player.x + player.width / 2,  // Position X du joueur
          player.y + player.height / 2, // Position Y du joueur
          150,  // Largeur du filet
          80,  // Hauteur du filet
          4,   // Vitesse de chute
          30   // Latence (30 frames = 0.5 seconde) temps avant de commencer à tomber
        )
      );
    }

    // Mettre à jour et dessiner les filets
    for (let i = nets.length - 1; i >= 0; i--) {
      nets[i].update(canvas.height);
      
      // Vérifier collision avec le joueur
      if (nets[i].checkCollision(player)) {
        console.log("Touché par un filet !"); // TODO: Game over
        nets.splice(i, 1);
        continue;
      }
      
      // Supprimer les filets hors écran
      if (nets[i].isOffScreen(canvas.height)) {
        nets.splice(i, 1);
      } else {
        nets[i].draw(ctx);
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
