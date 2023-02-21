const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  const data = await fs.readFile(filePath);
  const file = JSON.parse(data);

  if (file.length === 0) {
    throw new Error('Arquivo não encontrado.');
  }

  return file;
};

module.exports = readFile;