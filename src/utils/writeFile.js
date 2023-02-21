const fs = require('fs').promises;
const path = require('path'); // O path.dirname()método retorna o nome do diretório de um path

const filePath = path.resolve(__dirname, '../talker.json'); 

const writeFile = async (value) => {
  const data = JSON.stringify(value); // para salvar no arquivo, ao usar a funcao writeFile o arquivo deve ser salvo no formato string, por isso usa o stringify
  await fs.writeFile(filePath, data);
};

module.exports = writeFile;