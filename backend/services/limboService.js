const crypto = require('crypto');

function generateRandomNumber() {
  return crypto.randomBytes(4).readUInt32BE() / 0xFFFFFFFF;
}

exports.playGame = (bet, targetMultiplier) => {
  const randomNumber = generateRandomNumber();
  const gameMultiplier = 1 / randomNumber;

  const won = gameMultiplier >= targetMultiplier;
  const payout = won ? bet * targetMultiplier : 0;

  return {
    won,
    payout,
    gameMultiplier
  };
};