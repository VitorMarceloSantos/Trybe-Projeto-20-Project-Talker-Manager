const verifyNewUser = (req, res, next) => {
  const arrayVerify = ['name', 'age', 'talk', 'watchedAt', 'rate'];
  const { talk } = req.body;

  for (let i = 0; i < arrayVerify.length; i += 1) {
    if (!(arrayVerify[i] in req.body || (talk && arrayVerify[i] in req.body.talk))) {
      return res.status(400).json({ message: `O campo "${arrayVerify[i]}" é obrigatório` });
    }
  }
  return next();
};

module.exports = verifyNewUser;
