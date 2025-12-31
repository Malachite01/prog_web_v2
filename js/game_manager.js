//!   ______________
//!  |_CONSTANTES__|
//? Zone de jeu
const GodModeEnabled = 0; // Etre invincible
const Debug = 0; // Afficher les hitbox pour le debug
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

//? Joueur
const boostSprite = document.getElementById("fish-player");
const playerSprite = document.getElementById("poisson-other");
const bubbles = [];

//? Ennemy
const boatEnemy = document.getElementById("boat-enemy");
// Position initiale du bateau ennemi
let boatEnemyX = screen.width/2;
const boatSpeed = 4; // Faire varier la vitesse avec laquelle le bateau se retrouve au dessus du joueur

const netSprite = new Image();
netSprite.src = './assets/enemy/net.webp';
// Tableau pour stocker les filets actifs
let nets = [];
// Timer pour spawner les filets régulièrement
let netSpawnTimer = 0;
const netSpawnInterval = 60; // Spawner un filet toutes les 120 frames (2 secondes à 60fps)

//? Jeu
// Variable pour savoir si le jeu est actif
let isGameActive = true;


//!   __________
//!  |_CANVAS__|
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


//!   __________
//!  |_PLAYER__|

// Attendre que tous les scripts soient chargés
window.addEventListener('DOMContentLoaded', () => {
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

  // Contrôles pour téléphone
  if (typeof initMobileControls === 'function') {
    initMobileControls(player);
  }


  //!   _____________
  //!  |_GAME OVER__|
  // Fonction pour afficher le game over si collision
  function showGameOver() {
      isGameActive = false;

      // Stop le timer et récupère le temps final
      stopTimer();
      const finalTime = getTime();

      
      // Rajouter le message de félicitation si on fait notre meilleur temps:
      const currentSeconds = getTimeInSeconds();
      const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      const bestSeconds = highScores.length ? highScores[0].score.seconds : -1; // top actuel (tri décroissant)
      const isNewRecord = currentSeconds > bestSeconds;

      const msg = document.getElementById('new-record-msg');
      if (msg) msg.style.display = isNewRecord ? 'block' : 'none';

      // Afficher le temps final dans l'écran de game over
      document.getElementById('final-time').textContent = finalTime;
      document.getElementById('game-over-screen').style.display = 'flex'; // Afficher et centrer Game Over
      document.getElementById('game-over-input').style.display = 'block'; // Afficher Game Over étape 1
      document.getElementById('game-over-scores').style.display = 'none'; // S'assurer que Game Over étape 2 est cachée
  }


  //!   _____________
  //!  |_GAME LOOP__|
  function gameLoop() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // Mettre à jour le joueur
    player.update(canvas.clientWidth, canvas.clientHeight);
    

    //? Générer des bulles uniquement pendant le boost
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

    //? Spawner des filets régulièrement
    netSpawnTimer++;
    if (netSpawnTimer >= netSpawnInterval) {
      netSpawnTimer = 0;
      // Décaler le filet de façon aléatoire autour du joueur (X uniquement)
      const randomOffsetX = (Math.random() - 0.5) * 200; // -100 à +100 pixels
      
      // Créer un filet qui vise la position actuelle du joueur
      nets.push(
        new Net(
          netSprite,
          player.x + player.width / 2 + randomOffsetX,  // Position X du joueur
          player.y + player.height / 2, // Position Y du joueur
          130,  // Largeur du filet
          60,  // Hauteur du filet
          3,   // Vitesse de chute
          60   // Latence (30 frames = 0.5 seconde) temps avant de commencer à tomber
        )
      );
    }

    // Mettre à jour et dessiner les filets
    for (let i = nets.length - 1; i >= 0; i--) {
      nets[i].update(canvas.height);
      
      // Dessiner les hitbox pour le debug
      if(Debug) {
        player.drawCollision(ctx);
        nets[i].drawCollision(ctx);
      }
      // Vérifier collision avec le joueur
      if (isGameActive && nets[i].checkCollision(player) && player.checkCircularCollision(nets[i])) {
          if (!GodModeEnabled) {
              showGameOver(); // Afficher le game over
          }
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
    
    // Bouger le bateau par rapport au joueur 
    // Centrer le bateau sur la position X du joueur (on cherche le milieu du joueur)
    const rect = canvas.getBoundingClientRect();
    const playerCenterX = player.x + player.width / 2;
    const targetX = rect.left + playerCenterX - boatEnemy.offsetWidth / 2;
    const dx = targetX - boatEnemyX;
    boatEnemyX += Math.sign(dx) * Math.min(Math.abs(dx), boatSpeed);
    boatEnemy.style.left = boatEnemyX + "px";


    // Continuer la boucle de jeu si actif
    if (isGameActive) {
      requestAnimationFrame(gameLoop);
    }
  }

  // Démarrer le jeu
  gameLoop();
});
