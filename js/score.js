// Fonction pour ajouter un score après la soumission du formulaire
function addScore(event) {
  // Empêcher le formulaire de recharger la page
  event.preventDefault();

  // Création d'un objet String pour le nom d'utilisateur sans les espaces
  const playerName = document.getElementById('player-name').value.trim();

  const score = {
    minSeconds: getTime(), // utile pour l'affichage 
    seconds: getTimeInSeconds() // utile pour comparer les scores
  };
  
  // Sauvegarder le score
  saveHighScore(playerName, score);

  // cacher l'écran 1
  document.getElementById("game-over-input").style.display = "none";
  // afficher l'écran 2
  document.getElementById("game-over-scores").style.display = "flex";

  // afficher le podium
  displayHighScores();
}


// Fonction pour sauvegarder le score dans le localStorage
function saveHighScore(playerName, score) {
  // Récupérer les scores existants
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Ajouter le nouveau score si le nom d'utilisateur n'est pas vide
  if (playerName === '') return; 
  highScores.push({
    playerName,
    score 
  });

  // Trier les scores (du plus élevé au plus bas)
  highScores.sort((a, b) => b.score.seconds - a.score.seconds);

  // Limiter à 3 scores maximum (top 3)
  highScores = highScores.slice(0, 100);

  // Sauvegarder dans le localStorage
  localStorage.setItem('highScores', JSON.stringify(highScores));
}


// Fonction pour afficher les scores sauvegardés
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const inGameHighScoresTable = document.getElementById('high-scores');
  const gameOverGameHighScoresTable = document.getElementById('game-over-high-scores');

  // Réinitialiser le contenu de la table : Nom des colonnes des tableaux
  inGameHighScoresTable.innerHTML = '<thead><tr><th>🏆</th><th>Pseudo</th><th>Temps</th></tr></thead><tbody></tbody>';
  gameOverGameHighScoresTable.innerHTML = '<thead><tr><th>Classement</th><th>Pseudo</th><th>Temps</th></tr></thead><tbody></tbody>';

  function getRankLabel(index) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  }

  // Vérifier si la liste des scores est vide
  if (highScores.length === 0) {
    const messageRow = document.createElement('tr');
    messageRow.innerHTML = `<td colspan="2" style="text-align: center;">Aucun score disponible</td>`;
    inGameHighScoresTable.querySelector('tbody').appendChild(messageRow);
    gameOverGameHighScoresTable.querySelector('tbody').appendChild(messageRow.cloneNode(true)); // on clone la ligne du 1er tableau pour la mettre dans le 2nd
  } else {
    highScores.slice(0, 3).forEach((scoreEntry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${getRankLabel(index)}</td><td>${scoreEntry.playerName}</td><td>${scoreEntry.score.minSeconds}</td>`;

      inGameHighScoresTable.querySelector('tbody').appendChild(row);
    });
    highScores.slice(0, 100).forEach((scoreEntry, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${getRankLabel(index)}</td><td>${scoreEntry.playerName}</td><td>${scoreEntry.score.minSeconds}</td>`;
      gameOverGameHighScoresTable.querySelector('tbody').appendChild(row.cloneNode(true)); // car problème de parents cf. ci-dessus
    });
  }

}
document.addEventListener('DOMContentLoaded', displayHighScores);
