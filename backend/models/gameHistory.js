const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('../config'); // Assuming the config file is in the same directory as gameHistory.js
const sequelize = require('../database');

const GameHistory = sequelize.define('Game', {
  bet: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  targetNumber: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  randomNumber: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  success: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  winAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

exports.addGame = async (game) => {
  await GameHistory.create(game);
};

exports.getHistory = async () => {
  return await GameHistory.findAll({
    order: [['createdAt', 'DESC']],
    limit: 100
  });
};
exports.initializeDatabase = async () => {
  await sequelize.sync();
};