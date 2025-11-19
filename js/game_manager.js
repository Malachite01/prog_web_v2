const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const playerSprite = document.getElementById("fish-player");

// TODO: faire la classe Player
// const player = new Player(
//   playerSprite,
//   100, 200,      // position x, y 
//   50, 50,        // width, height
//   3              // speed
// );

//TODO: implementer la boucle de jeu
function gameLoop() {
  // faire bouger le joueur, et le bateau qui nous suit
}

//TODO: Keyboard controls
// document.addEventListener("keydown", e => {
//   if (e.key === "ArrowLeft") player.moveLeft();
//   if (e.key === "ArrowRight") player.moveRight();
//   if (e.key === "ArrowUp") player.moveUp();
//   if (e.key === "ArrowDown") player.moveDown();
// });

// document.addEventListener("keyup", e => {
//   if (["ArrowLeft","ArrowRight"].includes(e.key)) player.stopX();
//   if (["ArrowUp","ArrowDown"].includes(e.key)) player.stopY();
// });


gameLoop();
