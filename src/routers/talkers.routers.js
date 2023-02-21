const express = require('express');

const router = express.Router();
const readFile = require('../utils/readFile');
const verifyToken = require('../middleware/verifyToken');
const verifyNewUser = require('../middleware/verifyNewUser');
const verifyAttributes = require('../middleware/verifyAttributes');
const writeFile = require('../utils/writeFile');
const verifySearch = require('../middleware/verifySearch');
const verifySearchLength = require('../middleware/verifySearchLength');
const verifyAttributesTalkDate = require('../middleware/verifyAttributesTalkDate');
const verifyAttributesTalkRate = require('../middleware/verifyAttributesTalkRate');

// Rotas de Talkers

router.get('/talker', async (req, res) => {
  try {
    const users = await readFile();
    if (users) {
      res.status(200).json(users);
    } 
  } catch (err) {
    res.status(200).json([]);
  }
});

router.get('/talker/search', verifyToken, verifySearch, verifySearchLength, async (req, res) => {
  const file = await readFile();

  return res.status(200).json(file);
});

router.get('/talker/:id', async (req, res) => {
  const idParams = Number(req.params.id);
  try {
    const users = await readFile();
    const searchUser = users.find(({ id }) => id === idParams);
    if (searchUser) {
      return res.status(200).json(searchUser);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/talker',
    verifyToken,
    verifyNewUser,
    verifyAttributes,
    verifyAttributesTalkDate,
    verifyAttributesTalkRate, async (req, res) => {
  const file = await readFile();
  const { name, age, talk } = req.body;
  const newUser = { age, id: file.length + 1, name, talk };

  await writeFile([...file, newUser]); // cadastrando o usuario

  res.status(201).json(newUser);
});

router.put('/talker/:id',
    verifyToken,
    verifyNewUser,
    verifyAttributes,
    verifyAttributesTalkDate,
    verifyAttributesTalkRate, async (req, res) => {
  const idParams = Number(req.params.id);
  const file = await readFile();
  try {
    const user = file.find(({ id }) => id === idParams);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  const { name, age, talk } = req.body;
  const editUser = { age, id: idParams, name, talk };

  file[idParams - 1] = editUser; // editando o usuario no array na posição do id
  await writeFile(file);

  res.status(200).json(editUser);
});

router.delete('/talker/:id', verifyToken, async (req, res) => {
  const idParams = Number(req.params.id);
  const file = await readFile();
  try {
    const userIndex = file.findIndex(({ id }) => id === idParams);
    if (!userIndex) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await writeFile(file.slice(userIndex, 1)); // excluindo o objeto na posição findIndex
  } catch (err) {
    res.status(500).json({ message: err });
  }

  res.status(204).end();
});

module.exports = router;
