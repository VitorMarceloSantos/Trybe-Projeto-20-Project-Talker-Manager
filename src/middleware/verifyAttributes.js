const verifyAttributes = (req, res, next) => {
  const { name = '', age = 0 } = req.body;
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
};
module.exports = verifyAttributes;