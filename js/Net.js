class Net {
  // Constructeur du filet
  constructor(sprite, targetX, targetY, width, height, fallSpeed, latency) {
    this.sprite = sprite; // Image du filet
    this.targetX = targetX; // Position X cible (le joueur)
    this.targetY = targetY; // Position Y cible (le joueur)
    this.width = width;
    this.height = height;
    this.fallSpeed = fallSpeed; // Vitesse de descente
    this.latency = latency; // Délai en frames avant de commencer à tomber
    
    // Position de départ (en haut du canvas, aligné avec la cible)
    this.x = targetX - width / 2;
    this.y = -height; // Hors écran en haut
    
    // État du filet
    this.isFalling = false;
    this.latencyCounter = latency;
  }
  
  update(canvasHeight) {
    // Gérer la latence
    if (this.latencyCounter > 0) {
      this.latencyCounter--;
      return; // Ne pas bouger pendant la latence
    }
    
    // Commencer à tomber après la latence
    this.isFalling = true;
    this.y += this.fallSpeed;
  }
  
  draw(ctx) {
    ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  
  // Vérifier si le filet est hors de l'écran (en bas)
  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }
  
  // Vérifier la collision avec le joueur
  checkCollision(player) {
    return (
      this.x < player.x + player.width &&
      this.x + this.width > player.x &&
      this.y < player.y + player.height &&
      this.y + this.height > player.y
    );
  }

  drawCollision(ctx) {
    ctx.strokeStyle = 'red'; // Couleur du contour
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height); // Dessine le contour
  }
}