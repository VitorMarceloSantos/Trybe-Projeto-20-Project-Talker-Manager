const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  return next();
};

module.exports = verifyToken;