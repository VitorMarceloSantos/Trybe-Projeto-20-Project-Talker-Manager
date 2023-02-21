const express = require('express');

const router = express.Router();

const talkersRouter = require('./talkers.routers');
const loginRouter = require('./login.router');

// Pode importar diversas rotas
router.use(talkersRouter);
router.use(loginRouter);

module.exports = router;