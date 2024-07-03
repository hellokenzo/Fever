const express = require('express');
const userController = require('../controllers/users/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/balance', authMiddleware, userController.getBalance);
router.post('/balance', authMiddleware, userController.updateBalance);

module.exports = router;