const express = require('express');
const router = express.Router();
const users = require('../data/users');


router.get('/balance', (req, res) => {
  const userId = parseInt(req.headers['x-user-id'], 10);

  if (!userId) {
    return res.status(400).json({ error: 'Falta el header x-user-id' });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json({
    balance: user.wallet.balance,
    currency: user.wallet.currency
  });
});

router.post('/topup', (req, res) => {
  const userId = parseInt(req.headers['x-user-id'], 10);
  const { amount, cardId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Falta el header x-user-id' });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Monto inválido' });
  }

  if (!cardId) {
    return res.status(400).json({ error: 'Falta cardId' });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const card = user.cards.find(c => c.id === cardId);

  if (!card) {
    return res.status(400).json({ error: 'La tarjeta no pertenece al usuario' });
  }


  user.wallet.balance += amount;

  res.json({
    message: 'Carga realizada con éxito',
    newBalance: user.wallet.balance,
    currency: user.wallet.currency
  });
});


module.exports = router;
