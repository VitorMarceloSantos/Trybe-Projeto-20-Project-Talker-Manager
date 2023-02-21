const verifyLogin = (req, res, next) => {
  const { email = '', password = 0 } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next(); // caso satisfaça todos os critérios
};

module.exports = verifyLogin;