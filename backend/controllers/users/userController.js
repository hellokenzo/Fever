const db = require('../../database');

/*
* GET /user/balance
*/

exports.getBalance = (req, res) => {
  const userId = req.user.id;
  
  db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    res.json({ balance: row.balance });
  });
};

/*
* POST /user/balance
*/

exports.updateBalance = (req, res) => {
  const userId = req.user.id;
  const { amount, operation } = req.body;
  
  if (!amount || !['add', 'set'].includes(operation)) {
    return res.status(400).json({ error: 'Paramètres invalides' });
  }

  db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }

    let newBalance;
    if (operation === 'add') {
      newBalance = row.balance + amount;
    } else {  // set
      newBalance = amount;
    }

    db.run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de mise à jour du solde' });
      }
      res.json({ message: 'Solde mis à jour avec succès', newBalance });
    });
  });
};

/*
* GET /user/history
*/

exports.getGameHistory = (req, res) => {
    const userId = req.user.id;
    const { limit = 10, offset = 0 } = req.query;
    
    db.all(`
      SELECT gh.*, g.name as game_name 
      FROM game_history gh
      JOIN games g ON gh.game_id = g.id
      WHERE gh.user_id = ? 
      ORDER BY gh.timestamp DESC 
      LIMIT ? OFFSET ?
    `, [userId, limit, offset], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      const formattedRows = rows.map(row => ({
        ...row,
        outcome: JSON.parse(row.outcome)
      }));
      res.json(formattedRows);
    });
  };
  