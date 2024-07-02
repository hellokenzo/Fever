const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

/*
* POST /users/register
*/

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const existingUser = await User.findOne({ 
      where: { 
        [sequelize.Op.or]: [{ email }, { username }]
      } 
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email ou nom d\'utilisateur déjà utilisé' });
    }

    const user = await User.create({ email, username, password });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        coins: user.coins
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur lors de la création du compte' });
  }
};

/*
* POST /users/login
*/

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis' });
      }
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }
  
      const isPasswordValid = await user.comparePassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || '1f4a1635f42d7a64a8f33c96745c876e9b6c88f3c98b4e4309bd1e2d7e5bc614',
        { expiresIn: '1h' }
      );
  
      res.json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          coins: user.coins
        }
      });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  };
  
 /*
 * GET /users/profile
 */

  exports.getProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: ['username', 'email']
      });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };
  
  /*
  * DELETE /users/profile
  */

  exports.deleteProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      await user.destroy();
      res.json({ message: 'Compte supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

/*
* PUT /users/profile/email
*/

  exports.changeEmail = async (req, res) => {
    try {
      const { newEmail } = req.body;
      const user = await User.findByPk(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      user.email = newEmail;
      await user.save();
      res.json({ message: 'Email changé avec succès' });
    } catch (error) {
      console.error('Erreur lors du changement d\'email:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

/*
* GET /users/balance
*/

  exports.getBalance = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.userId, {
        attributes: ['coins']
      });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération du solde:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

  /*
  * PUT /users/balance/set
  */

  exports.setBalance = async (req, res) => {
    try {
      const { amount } = req.body;
      const user = await User.findByPk(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      user.coins = amount;
      await user.save();
      res.json({ message: 'Solde mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du solde:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };