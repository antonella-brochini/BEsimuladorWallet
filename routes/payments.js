const express = require('express');
const router = express.Router();
const { users }= require('../data/users');
const { transactions } = require('../data/transactions');

router.post('/wallet', (req, res) => {
  const userId = Number(req.header('X-User-Id'));
  const { amount, recipient, description } = req.body;

  if (!userId || !amount || !recipient) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const wallet = user.wallet

  if (!wallet) {
    return res.status(404).json({ error: "Wallet no encontrada" });
  }

  if (wallet.balance < amount) {
    return res.status(400).json({ error: "Saldo insuficiente" });
  }

  wallet.balance -= amount;

  const transaction = {
    id: transactions.length + 1,
    userId,
    type: "wallet",
    amount,
    currency: wallet.currency,
    recipient,
    description: description || null,
    date: new Date(),
  };

  transactions.push(transaction);

  return res.status(201).json({
    message: "Pago con wallet exitoso",
    transaction,
    newBalance: wallet.balance,
  });



});

  router.post('/card', ( req, res) => {

  const userId = Number(req.header("X-User-Id"));
  const { amount, recipient, description , cardId } = req.body;

  if (!userId || !amount || !recipient || !cardId) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  const card = user.cards.find(c => c.id === cardId);
  if (!card) {
    return res.status(404).json({ error: "Tarjeta no encontrada" });
  } 

  const transaction = {
    id: transactions.length + 1,
    userId,
    type: "card",
    amount,
    currency: "UYU",
    recipient,
    description: description || null,
    cardId: cardId,
    date: new Date(),
  };

  transactions.push(transaction);

  return res.status(201).json({
    message: "Pago con tarjeta exitoso",
    transaction,
  });
});

module.exports = router;
