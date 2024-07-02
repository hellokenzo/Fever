const express = require('express');
const config = require('./config');
const limboRoutes = require('./routes/limboRoutes');
const userRoutes = require('./routes/userRoutes');
const { initializeDatabase } = require('./models/gameHistory');
const User = require('./models/user');
const sequelize = require('./database');
// const cors = require('cors');

const app = express();
// app.use(cors());
app.use(express.json());

app.use('/games/limbo', limboRoutes);
app.use('/users', userRoutes);

const initApp = async () => {
  try {
    await initializeDatabase();
    await sequelize.sync(); // Maintenant cela devrait fonctionner
    
    app.listen(config.PORT, () => {
      console.log(`API server work on the port: ${config.PORT}`);
    });
  } catch (err) {
    console.error('Error init app:', err);
  }
};

initApp();