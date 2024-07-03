const express = require('express');
const limboRoutes = require('./routes/limboRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/games/limbo', limboRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur Limbo en écoute sur le port ${PORT}`);
});