const express = require('express');
const limboController = require('../controllers/games/limboController');
const userController = require('../controllers/users/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/play', authMiddleware, limboController.play);
router.get('/history', authMiddleware, userController.getGameHistory);

module.exports = router;