window.addEventListener("load", () => {
  const audio = document.getElementById("background-audio");
  const logoSon = document.getElementById("logo-son");

  // On mute l'audio au chargement pour respecter les politiques des navigateurs
  audio.muted = true;
  audio.play().catch(() => {});

  // Si l'utilisateur a déjà débloqué l'audio auparavant
  if (sessionStorage.getItem("audioUnlocked") === "true") {
    audio.muted = false;
    audio.play().catch(() => {});
  }

  // Récupérer le dernier état du bouton depuis sessionStorage
  if (sessionStorage.getItem("audioPaused") === "true") {
    audio.pause();
    logoSon.src = "./assets/images/soundoff.svg";
  } else {
    audio.play().catch(() => {});
    logoSon.src = "./assets/images/soundon.svg";
  }

  // Activation sur première interaction si pas déjà débloqué
  function enableAudioOnce() {
    audio.muted = false;
    audio.play().catch(() => {});
    sessionStorage.setItem("audioUnlocked", "true");
    document.removeEventListener("click", enableAudioOnce);
  }

  if (sessionStorage.getItem("audioUnlocked") !== "true") {
    document.addEventListener("click", enableAudioOnce);
  }
});

// Fonction pour toggler le son avec bouton et stocker l'état
function toggleSound() {
  const audio = document.getElementById('background-audio');
  const logoSon = document.getElementById('logo-son');

  if (audio.paused) {
      audio.play().catch(() => {});
      logoSon.src = "./assets/images/soundon.svg";
      sessionStorage.setItem("audioPaused", "false");
  } else {
      audio.pause();
      logoSon.src = "./assets/images/soundoff.svg";
      sessionStorage.setItem("audioPaused", "true");
  }
}
