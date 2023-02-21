const verifyAttributesTalkDate = (req, res, next) => {
  const { talk } = req.body;
  if (talk) {
    const { watchedAt = '' } = req.body.talk;
      const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    if (!regexDate.test(watchedAt)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
  }
  return next();
};

module.exports = verifyAttributesTalkDate;