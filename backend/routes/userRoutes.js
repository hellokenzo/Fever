const express = require('express');
const userController = require('../controllers/user/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/change-email', authMiddleware, userController.changeEmail);
router.get('/balance', authMiddleware, userController.getBalance);
router.post('/balance/set', authMiddleware, userController.setBalance);
router.delete('/delete', authMiddleware, userController.deleteProfile);


module.exports = router;