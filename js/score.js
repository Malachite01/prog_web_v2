function addScore(event) {
  // Empêcher le formulaire de recharger la page
  event.preventDefault();

  // Création d'un objet String pour le nom d'utilisateur sans les espaces
  const playerName = new String(document.getElementById('player-name').value.trim());
  const score = (
    minSeconds = getTime(), // utile pour l'affichage 
    seconds = getTimeInSeconds() // utile pour comparer les scores
  );
  //const difficulty = document.getElementById('difficulty-menu').value;

  // Sauvegarder le score
  saveHighScore(playerName, score);

  // Refresh la page pour afficher les scores
  window.location.reload();
}


/**
 * Fonction pour sauvegarder le score dans le localStorage
 * @param {string} playerName - Nom de l'utilisateur
 * @param {table} score - Score à sauvegarder et afficher (mm:ss)
 * @param {number} scoreValue - Score à sauvegarder et comparer (sss)
 */
function saveHighScore(playerName, score) {
  // Récupérer les scores existants
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Ajouter le nouveau score si le nom d'utilisateur n'est pas vide
  if (playerName === '') return; 
  highScores.push({ playerName, score });
  highScores.push({
    playerName,
    score,       // ex: "02:15"
    scoreValue   // ex: 135
  });

  // Trier les scores (du plus élevé au plus bas)
  highScores.sort((a, b) => b.scoreValue - a.scoreValue);

  // Limiter à 10 scores maximum (top 10)
  highScores = highScores.slice(0, 10);

  // Sauvegarder dans le localStorage
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

/**
 * Fonction pour afficher les scores sauvegardés
 */
function displayHighScores() {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const highScoresTable = document.getElementById('high-scores');

  // Réinitialiser le contenu de la table
  highScoresTable.innerHTML = '<thead><tr><th>Nom</th><th>Score</th></tr></thead><tbody></tbody>';

  // Vérifier si la liste des scores est vide
  if (highScores.length === 0) {
    const messageRow = document.createElement('tr');
    messageRow.innerHTML = `<td colspan="2" style="text-align: center;">Aucun score disponible</td>`;
    highScoresTable.closest('table').querySelector('tbody').appendChild(messageRow);
  } else {
    // Ajouter chaque score en tant que ligne
    highScores.forEach(scoreEntry => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${scoreEntry.username}</td><td>${scoreEntry.score}</td>`;
      highScoresTable.closest('table').querySelector('tbody').appendChild(row);
    });
  }
}