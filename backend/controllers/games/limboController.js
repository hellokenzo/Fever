const limboService = require('../../services/limboService');
const db = require('../../database');

/*
* POST /games/limbo/play
*/

exports.play = (req, res) => {
  const { bet, targetMultiplier } = req.body;
  const userId = req.user.id;

  if (!bet || !targetMultiplier) {
    return res.status(400).json({ error: 'Mise et multiplicateur cible requis' });
  }

  db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    if (row.balance < bet) {
      return res.status(400).json({ error: 'Solde insuffisant' });
    }

    const result = limboService.playGame(bet, targetMultiplier);
    
    const newBalance = row.balance + result.payout - bet;
    db.run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de mise à jour du solde' });
      }

      // Enregistrer l'historique de la partie
      const outcome = JSON.stringify({
        targetMultiplier: targetMultiplier,
        gameMultiplier: result.gameMultiplier,
        won: result.won
      });

      db.get('SELECT id FROM games WHERE name = ?', ['Limbo'], (err, game) => {
        if (err) {
          console.error('Erreur de récupération de l\'ID du jeu', err);
          return res.status(500).json({ error: 'Erreur interne du serveur' });
        }

        db.run('INSERT INTO game_history (user_id, game_id, bet, outcome, payout) VALUES (?, ?, ?, ?, ?)',
          [userId, game.id, bet, outcome, result.payout], (err) => {
          if (err) {
            console.error('Erreur d\'enregistrement de l\'historique', err);
          }
          res.json({ ...result, newBalance });
        });
      });
    });
  });
};