const knex = require('../connections/postgres');
const jwt = require('jsonwebtoken');

const authenticatedManager = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY);

        const managerFound = await knex('administradores').where({ id }).first();

        if (!managerFound) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...manager } = managerFound;

        req.manager = manager;

        next()

    } catch (error) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }
}

module.exports = authenticatedManager;