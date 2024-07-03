const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./casino.db', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données', err.message);
  } else {
    console.log('Connecté à la base de données SQLite');
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        balance REAL DEFAULT 1000
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS game_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        game_id INTEGER,
        bet REAL,
        outcome JSON,
        payout REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (game_id) REFERENCES games(id)
      )`);
      db.run(`INSERT OR IGNORE INTO games (name) VALUES ('Limbo')`);
    });
  }
});

module.exports = db;