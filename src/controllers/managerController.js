const bcrypt = require("bcrypt");
const knex = require("../connections/postgres");

const registerManager = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const passwordEncrypted = await bcrypt.hash(senha, 10);

        const userFound = await knex("administrador").where({ email }).first();

        if (userFound) {
            return res
                .status(400)
                .json({ mensagem: "Esse email já possui cadastro" });
        }

        const user = await knex("usuarios")
            .insert({
                nome,
                email,
                senha: passwordEncrypted,
            })
            .returning("*");

        const { senha: _, ...userRegistered } = user[0];

        return res.status(201).json(userRegistered);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    registerManager
}