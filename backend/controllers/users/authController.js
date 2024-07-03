const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../database');

const SECRET_KEY = '1f4a1635f42d7a64a8f33c96745c876e9b6c88f3c98b4e4309bd1e2d7e5bc614';

/*
* POST /auth/register
*/

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
    }
    
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Nom d\'utilisateur ou email déjà utilisé' });
        }
        return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
      }
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
  });
};

/*
* POST /auth/login
*/

exports.login = (req, res) => {
  const { login, password } = req.body;
  
  if (!login || !password) {
    return res.status(400).json({ error: 'Login et mot de passe requis' });
  }

  // Vérifie si le login est un email ou un nom d'utilisateur
  const loginField = login.includes('@') ? 'email' : 'username';
  
  db.get(`SELECT * FROM users WHERE ${loginField} = ?`, [login], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    if (!user) {
      return res.status(400).json({ error: 'Utilisateur non trouvé' });
    }
    
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ error: 'Mot de passe incorrect' });
      }
      
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};