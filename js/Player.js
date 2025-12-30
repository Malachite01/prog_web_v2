class Player {
  // Constructeur de la classe Player
  constructor(sprite, boostSprite, x, y, width, height, speed) {
    this.baseSprite = sprite; // Sprite normal du poisson
    this.boostSprite = boostSprite; // Sprite en mode boost
    this.sprite = sprite; // Sprite actuellement utilisé

    this.x = x; // Position X du poisson 
    this.y = y; // Position Y du poisson
    this.width = width; // Largeur du poisson
    this.height = height; // Hauteur du poisson
    this.speed = speed; // Vitesse maximale du poisson

    // Facteurs d'échelle pour respecter le ratio du sprite
    this.scaleX = this.width / this.sprite.naturalWidth;
    this.scaleY = this.height / this.sprite.naturalHeight;
    
    // Angle de rotation par défaut en radians (0 = droite, le poisson regarde naturellement à droite)
    this.angle = 0;
    
    // Vitesse de rotation (en radians par frame)
    this.rotationSpeed = 0.08;
    
    // Vélocité actuelle
    this.velocityX = 0;
    this.velocityY = 0;
    
    // Acceleration
    this.acceleration = 0.3;
    this.boostMultiplier = 2.5; // (optionnel maintenant)
    this.deceleration = 0.95;
    
    // Contrôles actifs (pour gérer les touches enfoncées)
    this.controls = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      boost: false
    };
  }
  
  // Fonctions de rotation
  rotateLeft() {
    this.angle -= this.rotationSpeed;
  }

  rotateRight() {
    this.angle += this.rotationSpeed;
  }
  
  // Fonction pour faire avancer le poisson
  moveForward() {
    // Accélération boostée ou normale
    const accel = this.controls.boost
      ? this.acceleration * this.boostMultiplier
      : this.acceleration;

    this.velocityX += Math.cos(this.angle) * accel;
    this.velocityY += Math.sin(this.angle) * accel;

    // Vitesse max boostée ou normale
    const maxSpeed = this.controls.boost
      ? this.speed * this.boostMultiplier
      : this.speed;

    const currentSpeed = Math.hypot(this.velocityX, this.velocityY);
    if (currentSpeed > maxSpeed) {
      this.velocityX = (this.velocityX / currentSpeed) * maxSpeed;
      this.velocityY = (this.velocityY / currentSpeed) * maxSpeed;
    }
  }

  // Fonction pour faire reculer le poisson
  moveBackward() {
    this.velocityX -= Math.cos(this.angle) * this.acceleration * 0.5;
    this.velocityY -= Math.sin(this.angle) * this.acceleration * 0.5;
  }
  
  // Mise à jour de la position et de l'état du poisson
  update(canvasWidth, canvasHeight) {
    // Gérer les contrôles
    if (this.controls.left) this.rotateLeft();
    if (this.controls.right) this.rotateRight();
    if (this.controls.forward) this.moveForward();
    if (this.controls.backward) this.moveBackward();
    
    // Appliquer la friction
    this.velocityX *= this.deceleration;
    this.velocityY *= this.deceleration;
    
    // Mettre à jour la position
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    // Limites du canvas
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width;
    if (this.y + this.height > canvasHeight) this.y = canvasHeight - this.height;
  }
  
  // Dessiner le poisson avec rotation
  draw(ctx) {
    ctx.save();
    
    // Choisir le sprite selon le boost
    this.sprite = this.controls.boost ? this.boostSprite : this.baseSprite;

    ctx.translate(
      this.x + this.width / 2,
      this.y + this.height / 2
    );
    
    // Appliquer la rotation du joueur
    ctx.rotate(this.angle);

    // Appliquer l'échelle (identique pour les deux sprites)
    ctx.scale(this.scaleX, this.scaleY);
    
    // Dessiner le sprite
    ctx.drawImage(
      this.sprite,
      -this.sprite.naturalWidth / 2,
      -this.sprite.naturalHeight / 2
    );
    
    ctx.restore();
  }
  
  getNosePosition() {
    return {
      x: this.x + this.width / 2 + Math.cos(this.angle) * (this.width / 2),
      y: this.y + this.height / 2 + Math.sin(this.angle) * (this.width / 2)
    };
  }
  
  setControl(direction, active) {
    if (this.controls.hasOwnProperty(direction)) {
      this.controls[direction] = active;
    }
  }

  checkCircularCollision(net) {
    const playerCenterX = this.x + this.width / 2;
    const playerCenterY = this.y + this.height / 2;
    
    const netCenterX = net.x + net.width / 2;
    const netCenterY = net.y + net.height / 2;
    
    const dx = playerCenterX - netCenterX;
    const dy = playerCenterY - netCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const radius = Math.min(this.width, this.height) / 2; // Rayon du poisson
    const netWidth = Math.sqrt(Math.pow(net.width, 2) + Math.pow(net.height, 2)); // Diagonale du filet

    return distance < radius + netWidth / 2; // Vérifie si la distance est inférieure à la somme des rayons
  }

  drawCollision(ctx) {
    ctx.strokeStyle = 'blue'; // Couleur du contour pour le poisson
    ctx.lineWidth = 2;

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const radius = Math.min(this.width, this.height) / 2; // Rayon du poisson

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Dessine un cercle
    ctx.stroke(); // Applique le contour
  }
}

// Bulles pour le boost
class Bubble {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;

    // Direction opposée au poisson
    const spread = (Math.random() - 0.5) * 0.6;
    this.vx = Math.cos(angle + Math.PI + spread) * (Math.random() * 1.5 + 0.5);
    this.vy = Math.sin(angle + Math.PI + spread) * (Math.random() * 1.5 + 0.5);

    this.radius = Math.random() * 4 + 2;
    this.life = 60 + Math.random() * 30;
    this.opacity = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    // Calcul de l'opacité qui diminue progressivement
    this.opacity = Math.max(0, this.life / 90);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "rgba(180, 220, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Vérifie si la bulle doit être supprimée
  isDead() {
    return this.life <= 0;
  }
}
