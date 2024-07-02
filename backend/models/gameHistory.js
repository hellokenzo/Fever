const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const GameHistory = sequelize.define('GameHistory', {
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