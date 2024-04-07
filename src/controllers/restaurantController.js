const knex = require("../connections/postgres");

const registerRestaurant = async (req, res) => {
    const { nome, cep, rua, numero, bairro, cidade, estado } = req.body;
   
    try {
        const restaurant = await knex('restaurantes')
            .insert({
                nome,
                cep,
                rua,
                numero,
                bairro,
                cidade,
                estado
            })
            .returning('*');

        return res.status(201).json(restaurant[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const getRestaurant = async (req, res) => {
    try {
        const restaurants = await knex('restaurantes');
        return res.status(200).json(restaurants);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    registerRestaurant,
    getRestaurant
}