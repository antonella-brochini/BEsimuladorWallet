const express = require('express');
const router = express.Router();
const users = require('../data/users');


router.post('/card', (req, res) => {
  const { cardHolder, cardNumber, expiryDate, cvv } = req.body;
  const userId = Number(req.header('X-User-Id'));
   if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Validaciones básicas (simuladas)
  if (!cardHolder || cardHolder.trim() === '') {
    return res.status(400).json({ success: false, message: 'Titular inválido' });
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    return res.status(400).json({ success: false, message: 'Número de tarjeta inválido' });
  }

  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return res.status(400).json({ success: false, message: 'Fecha inválida' });
  }

  if (!/^\d{3}$/.test(cvv)) {
    return res.status(400).json({ success: false, message: 'CVV inválido' });
  }

  //guardar tarjeta (memoria ram)
  const card = {
    cardHolder,
    cardNumber,
    expiryDate,
    cvv
  };
  user.cards.push(card);

  // Simulación OK
  res.status(200).json({
    success: true,
    message: 'Tarjeta ingresada correctamente',
    cards: user.cards
  });
});



router.get('/cards', (req, res) => {
  const userId = Number(req.header('X-User-Id'));

  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json({ success: true, cards: user.cards });
});

module.exports = router;