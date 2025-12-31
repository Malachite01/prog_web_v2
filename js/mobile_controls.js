
// Contrôles mobiles
function initMobileControls(player) {
  // Détecter si l'appareil est mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                   || (window.innerWidth <= 768);

  if (!isMobile) return; // Ne pas initialiser sur desktop

  // Bloquer le zoom mobile (gestes de pincement et double-tap)
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('gesturechange', e => e.preventDefault());
  document.addEventListener('gestureend', e => e.preventDefault());
  let lastTouchEnd = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault(); // Bloque double-tap zoom
    lastTouchEnd = now;
  }, { passive: false });

  // Récupérer les éléments du joystick et du boost
  const joystickContainer = document.getElementById('joystick-container');
  const joystickStick = document.getElementById('joystick-stick');
  const boostBtn = document.getElementById('boost-btn');

  // Variables du joystick
  let joystickActive = false;
  let joystickCenter = { x: 0, y: 0 };
  const joystickRadius = 75; // Rayon du joystick base
  const deadZone = 15;       // Zone morte au centre

  // Fonction pour calculer la position du joystick
  function updateJoystick(touchX, touchY) {
    const deltaX = touchX - joystickCenter.x;
    const deltaY = touchY - joystickCenter.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < deadZone) {
      // Zone morte : désactive tous les contrôles
      player.setControl('forward', false);
      player.setControl('backward', false);
      player.setControl('pitchUp', false);
      player.setControl('pitchDown', false);

      joystickStick.style.transform = 'translate(-50%, -50%)';
      return;
    }

    // Limiter le stick au rayon du joystick
    const limitedDistance = Math.min(distance, joystickRadius - 35);
    const angle = Math.atan2(deltaY, deltaX);

    const stickX = Math.cos(angle) * limitedDistance;
    const stickY = Math.sin(angle) * limitedDistance;

    joystickStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;

    // Normaliser les axes
    const normalizedX = deltaX / distance; // -1 à 1
    const normalizedY = deltaY / distance; // -1 à 1
    const threshold = 0.3;

    // Axe X Forward / Backward
    if (normalizedX > threshold) {
      player.setControl('forward', true);
      player.setControl('backward', false);
    } else if (normalizedX < -threshold) {
      player.setControl('backward', true);
      player.setControl('forward', false);
    } else {
      player.setControl('forward', false);
      player.setControl('backward', false);
    }

    // Axe Y Pitch Up / Down (inversé pour que haut = pitchUp)
    const invertedY = -normalizedY;
    if (invertedY > threshold) {
      player.setControl('pitchUp', true);
      player.setControl('pitchDown', false);
    } else if (invertedY < -threshold) {
      player.setControl('pitchDown', true);
      player.setControl('pitchUp', false);
    } else {
      player.setControl('pitchUp', false);
      player.setControl('pitchDown', false);
    }
  }

  // Événements tactiles pour le joystick
  joystickContainer.addEventListener('touchstart', e => {
    e.preventDefault();
    joystickActive = true;

    const rect = joystickContainer.getBoundingClientRect();
    joystickCenter.x = rect.left + rect.width / 2;
    joystickCenter.y = rect.top + rect.height / 2;
  });

  joystickContainer.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!joystickActive) return;

    const touch = e.touches[0];
    updateJoystick(touch.clientX, touch.clientY);
  });

  joystickContainer.addEventListener('touchend', e => {
    e.preventDefault();
    joystickActive = false;

    // Réinitialiser tous les contrôles
    player.setControl('forward', false);
    player.setControl('backward', false);
    player.setControl('pitchUp', false);
    player.setControl('pitchDown', false);

    // Remettre le stick au centre
    joystickStick.style.transform = 'translate(-50%, -50%)';
  });

  // Bouton boost
  boostBtn.addEventListener('touchstart', e => {
    e.preventDefault();
    player.setControl('boost', true);
  });

  boostBtn.addEventListener('touchend', e => {
    e.preventDefault();
    player.setControl('boost', false);
  });

  console.log('Contrôles mobiles initialisés');
}
