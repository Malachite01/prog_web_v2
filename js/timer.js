let temps = 0; // temps écoulé en secondes
let timer = null;
const timerElement = document.getElementById("timer");

function startTimer() {
    if (timer !== null) return;
    timer = setInterval(() => {
        temps++;
        showTimer();
    }, 1000);
}

function stopTimer() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function showTimer() {
    const minutes = Math.floor(temps / 60);
    const secondes = temps % 60;
    //document.getElementById("timer").textContent =`${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`; // affichages sous forme minutes:secondes
    timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
}

function getTimeInSeconds() {
    return temps;
}

function getTime() {
    return timerElement.textContent;
}

// Démarrer le timer au chargement du script
startTimer();