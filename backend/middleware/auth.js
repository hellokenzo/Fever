const jwt = require('jsonwebtoken');

const SECRET_KEY = '1f4a1635f42d7a64a8f33c96745c876e9b6c88f3c98b4e4309bd1e2d7e5bc614';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentification requise' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide' });
    }
    req.user = { id: decoded.userId };
    next();
  });
};