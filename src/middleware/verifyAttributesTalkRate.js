const verifyAttributesTalkDate = (req, res, next) => {
  const { talk } = req.body;
  if (talk) {
    const { rate = '' } = req.body.talk;
    const rateNumber = Number(rate);
    if (((rateNumber < 1 || rateNumber > 5) || !Number.isInteger(rateNumber))) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  }
  return next();
};

module.exports = verifyAttributesTalkDate;