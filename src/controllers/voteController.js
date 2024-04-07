const knex = require("../connections/postgres");
const { format, startOfDay, endOfDay } = require('date-fns');

const registerVote = async (req, res) => {
    const { idRestaurant } = req.body;
    const { idUsuario } = req.params;

    try {
        const userExisting = await knex('usuarios')
            .where({
                id: idUsuario,
            })
            .first();

        if (!userExisting) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado' })
        }

        const restaurantExisting = await knex('restaurantes')
            .where({
                id: idRestaurant,
            })
            .first();

        if (!restaurantExisting) {
            return res.status(400).json({ mensagem: 'Restaurante não encontrado' })
        }

        const restaurant = await knex('restaurantes')
            .where({ id: idRestaurant })
            .first();

        if (!restaurant) {
            return res.status(400).json({ mensagem: 'Restaurante não encontrado' });
        }

        const currentDate = new Date();
        //const formattedDate = format(currentDate);

        const voteExisting = await knex('votacao')
            .where({
                usuario_id: idUsuario,
                data_voto: currentDate
            })
            .first();

        if (voteExisting) {
            return res.status(400).json({ mensagem: 'Usuário já votou hoje' })
        }

        const voteComputade = await knex('votacao')
            .insert({
                restaurante_id: idRestaurant,
                usuario_id: idUsuario,
                data_voto: currentDate
            })
            .returning('*');

        return res.status(201).json({ mensagem: 'Voto realizado com sucesso' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const computeVotes = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDayDate = startOfDay(currentDate);
        const endOfDayDate = endOfDay(currentDate);

        const mostVotedRestaurants = await knex('votacao')
            .select('restaurante_id')
            .count('* as total_votes')
            .whereBetween('data_voto', [startOfDayDate, endOfDayDate])
            .groupBy('restaurante_id')
            .orderBy('total_votes', 'desc');

        if (mostVotedRestaurants.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum voto registrado para hoje' });
        }

        const maxVotes = mostVotedRestaurants[0].total_votes;
        const winnerRestaurants = mostVotedRestaurants.filter(restaurant => restaurant.total_votes === maxVotes);

        if (winnerRestaurants.length === 1) {
            return res.status(200).json({ restaurante_mais_votado: winnerRestaurants[0] });

        } else {
            return res.status(200).json({ mensagem: 'Empate nos votos entre vários restaurantes mais votados', restaurantes_empatados: winnerRestaurants });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    registerVote,
    computeVotes
};