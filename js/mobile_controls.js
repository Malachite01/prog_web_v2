// Contrôles mobiles
function initMobileControls(player) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                   || (window.innerWidth <= 768);
  if (!isMobile) return;
  
  // Bloquer le zoom
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('gesturechange', e => e.preventDefault());
  document.addEventListener('gestureend', e => e.preventDefault());
  let lastTouchEnd = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });
  
  const joystickContainer = document.getElementById('joystick-container');
  const joystickStick = document.getElementById('joystick-stick');
  const boostBtn = document.getElementById('boost-btn');
  
  let joystickActive = false;
  let joystickCenter = { x: 0, y: 0 };
  const joystickRadius = 75;
  const deadZone = 10;
  
  function updateJoystick(touchX, touchY) {
    const deltaX = touchX - joystickCenter.x;
    const deltaY = touchY - joystickCenter.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < deadZone) {
      player.setControl('forward', false);
      player.setControl('backward', false);
      player.setControl('left', false);
      player.setControl('right', false);
      joystickStick.style.transform = 'translate(-50%, -50%)';
      return;
    }
    
    const limitedDistance = Math.min(distance, joystickRadius - 35);
    const targetAngle = Math.atan2(deltaY, deltaX);
    
    joystickStick.style.transform = `translate(calc(-50% + ${Math.cos(targetAngle)*limitedDistance}px), calc(-50% + ${Math.sin(targetAngle)*limitedDistance}px))`;
    
    // Calculer la différence d'angle entre la direction du poisson et la direction cible
    let angleDiff = targetAngle - player.angle;
    
    // Normaliser l'angle entre -PI et PI (pour prendre le chemin le plus court)
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    
    const angleThreshold = 0.1; // Tolérance pour éviter les oscillations
    
    // Tourner vers la direction cible
    if (angleDiff > angleThreshold) {
      player.setControl('right', true);
      player.setControl('left', false);
    } else if (angleDiff < -angleThreshold) {
      player.setControl('left', true);
      player.setControl('right', false);
    } else {
      player.setControl('left', false);
      player.setControl('right', false);
    }
    
    // Avancer si on pousse le stick assez loin
    const pushStrength = distance / joystickRadius;
    if (pushStrength > 0.3) {
      player.setControl('forward', true);
      player.setControl('backward', false);
    } else {
      player.setControl('forward', false);
      player.setControl('backward', false);
    }
  }
  
  joystickContainer.addEventListener('touchstart', e => {
    joystickActive = true;
    const rect = joystickContainer.getBoundingClientRect();
    joystickCenter.x = rect.left + rect.width / 2;
    joystickCenter.y = rect.top + rect.height / 2;
    e.preventDefault();
  }, { passive: false });
  
  joystickContainer.addEventListener('touchmove', e => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    updateJoystick(touch.clientX, touch.clientY);
    e.preventDefault();
  }, { passive: false });
  
  joystickContainer.addEventListener('touchend', e => {
    joystickActive = false;
    player.setControl('forward', false);
    player.setControl('backward', false);
    player.setControl('left', false);
    player.setControl('right', false);
    joystickStick.style.transform = 'translate(-50%, -50%)';
    e.preventDefault();
  }, { passive: false });
  
  boostBtn.addEventListener('touchstart', e => {
    player.setControl('boost', true);
    e.preventDefault();
  }, { passive: false });
  
  boostBtn.addEventListener('touchend', e => {
    player.setControl('boost', false);
    e.preventDefault();
  }, { passive: false });
  
  console.log('Contrôles mobiles initialisés');
}