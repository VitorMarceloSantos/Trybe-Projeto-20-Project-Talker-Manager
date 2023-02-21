const readFile = require('../utils/readFile');

const verifySearch = async (req, res, next) => {
  const { q } = req.query;
  const file = await readFile();

  if (q) {
    const user = file.filter(({ name }) => name.includes(q));
    if (q.length > 0 && user.length === 0) {
      return res.status(200).json([]);
    }
  } 
  return next();
};
module.exports = verifySearch;