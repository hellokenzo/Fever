const { generateRandomNumber } = require('../../utils/randomGenerator');
const gameHistory = require('../../models/gameHistory');

exports.play = async (req, res) => {
  const { bet, targetNumber } = req.body;

  if (!bet || !targetNumber || isNaN(bet) || isNaN(targetNumber)) {
    return res.status(400).json({ error: 'Mise et nombre cible requis' });
  }

  const randomNumber = generateRandomNumber();

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
    bet,
    targetNumber,
    ...result
  });

  res.json(result);
};

exports.getHistory = async (req, res) => {
  const history = await gameHistory.getHistory();
  res.json(history);
};