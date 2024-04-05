const bcrypt = require("bcrypt");
const knex = require("../connections/postgres");

const registerManager = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const passwordEncrypted = await bcrypt.hash(senha, 10);

    const managerFound = await knex("administradores").where({ email }).first();

        if (managerFound) {
            return res
                .status(400)
                .json({ mensagem: "Esse email já possui cadastro" });
        }

        const manager = await knex("administradores")
            .insert({
                nome,
                email,
                senha: passwordEncrypted,
            })
            .returning("*");

        const { senha: _, ...managerRegistered } = manager[0];

        return res.status(201).json(managerRegistered);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    registerManager
}