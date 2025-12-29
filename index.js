const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/login');
const cardRoutes = require('./routes/cards');
const walletRoutes = require('./routes/wallet');
const userRoutes= require('./routes/user');
const paymentsRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());


app.use(loginRoutes);
app.use(userRoutes);
app.use(cardRoutes);
app.use('/wallet', walletRoutes);
app.use('/payments', paymentsRoutes); 


app.listen(3000, () => {
  console.log('🚀 API Wallet corriendo en puerto 3000');
});

