function toggleSound() {
  // TODO: Implement sound toggle functionality
  const audio = document.getElementById('background-audio');
  if (audio.paused) {
      audio.play();
  } else {
      audio.pause();
  }
  const soundBtn = document.getElementById('sound-btn');
  const logoSon = document.getElementById('logo-son');
  if (audio.paused) {
      logoSon.src = "./assets/images/soundoff.svg";
  } else {
      logoSon.src = "./assets/images/soundon.svg";
  }
}