const bcrypt = require('bcrypt');
const knex = require('../connections/postgres');
const jwt = require('jsonwebtoken');

const loginManager = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const managerFound = await knex('administradores').where({ email }).first();

    if (!managerFound) {
      return res
        .status(404)
        .json({ mensagem: 'E-mail e/ou senha inválido(s)' });
    }

    const { senha: managerPassword, ...manager } = managerFound;

    const validPassword = await bcrypt.compare(senha, managerPassword);

    if (!validPassword) {
      return res
        .status(404)
        .json({ mensagem: 'E-mail e/ou senha inválido(s)' });
    }

    const token = jwt.sign({ id: managerFound.id }, process.env.JWT_KEY, {
      expiresIn: '8h',
    });

    return res.status(200).json({ manager, token });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = loginManager;
