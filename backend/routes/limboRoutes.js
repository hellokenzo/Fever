const express = require('express');
const limboController = require('../controllers/games/limboController');

const router = express.Router();

router.post('/play', limboController.play);
router.get('/history', limboController.getHistory);

module.exports = router;

