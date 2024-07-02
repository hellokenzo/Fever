const express = require('express');
const userController = require('../controllers/user/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/logout', authMiddleware, (req, res) => {
  userController.logout(req, res);
});

router.get('/profile', authMiddleware, (req, res) => {
  userController.getProfile(req, res);
});

router.put('/change-email', authMiddleware, (req, res) => {
  userController.changeEmail(req, res);
});

router.get('/balance', authMiddleware, (req, res) => {
  userController.getBalance(req, res);
});

router.post('/balance/set', authMiddleware, (req, res) => {
  userController.setBalance(req, res);
});

router.delete('/delete', authMiddleware, (req, res) => {
  userController.deleteProfile(req, res);
});

module.exports = router;