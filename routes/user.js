const express = require('express');
const router = express.Router();
const users = require('../data/users');


router.get('/user', (req, res) => {
  const userId = Number(req.header('X-User-Id'));

  if (!userId) {
    return res.status(400).json({ error: 'Falta el header X-User-Id' });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  return res.status(200).json({
    success: true,
    user: user
  });

});
module.exports = router;