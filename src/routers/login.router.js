const express = require('express');

const router = express.Router();
const newToken = require('../utils/newToken');
const verifyLogin = require('../middleware/verifyLogin');

// Rotas de Talkers

router.post('/login', verifyLogin, (req, res) => {
  const token = newToken();
  res.status(200).json({ token });
});

module.exports = router;