const { generateRandomNumber } = require('../../utils/randomGenerator');
const gameHistory = require('../../models/gameHistory');
const jwt = require('jsonwebtoken');
const config = require('../../config');

/*
* POST /games/limbo/play
*/

exports.play = async (req, res) => {
  const { bet, targetNumber } = req.body;

  if (!bet || !targetNumber || isNaN(bet) || isNaN(targetNumber)) {
    return res.status(400).json({ error: 'Mise et nombre cible requis' });
  }

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, config.JWT_SECRET);

  const randomNumber = generateRandomNumber();
  const userId = decodedToken.userId;

  let result;
  if (randomNumber < targetNumber) {
    const multiplier = 99 / targetNumber;
    result = {
      success: true,
      randomNumber,
      winAmount: bet * multiplier
    };
  } else {
    result = {
      success: false,
      randomNumber,
      winAmount: 0
    };
  }

  // Ajouter le résultat à l'historique
  await gameHistory.addGame({
    userId,
    bet,
    targetNumber,
    ...result
  });

  res.json(result);
};



/*
* GET /games/limbo/history
*/

exports.getHistory = async (req, res) => {
  const history = await gameHistory.getHistory();
  res.json(history);
};