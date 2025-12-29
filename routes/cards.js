const express = require('express');
const router = express.Router();
const  users = require('../data/users');


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
  if ( cardHolder.trim() === '') {
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
    id: user.cards.length + 1,
    cardHolder,
    cardNumber,
    expiryDate,
    cvv,
    last4: cardNumber.slice(-4),
    brand: 'VISA' ,
    isPrimary: false,
  };
  user.cards.push(card);

  // Simulación OK
  res.status(200).json({
    success: true,
    message: 'Tarjeta ingresada correctamente',
    card: card
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

router.delete('/card/:id', (req, res) => {
 const userId = Number(req.header('X-User-Id'));
  const { id } = req.params;
  if (!userId) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
   const cardIndex = user.cards.findIndex(c => String(c.id) === id);

  if (cardIndex === -1) {
    return res.status(404).json({ error: 'Tarjeta no encontrada o no pertenece al usuario' });
  }

  user.cards.splice(cardIndex, 1);
  return res.json({ success: true, message: 'Tarjeta eliminada correctamente' });
});


module.exports = router;