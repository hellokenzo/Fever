const crypto = require('crypto');

exports.generateRandomNumber = () => {
  return crypto.randomInt(0, 10001) / 100;
};