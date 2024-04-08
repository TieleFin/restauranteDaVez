const knex = require("../connections/postgres");
const { startOfDay, endOfDay, startOfWeek, endOfWeek } = require('date-fns');

const registerVote = async (req, res) => {
    const { idRestaurant } = req.body;
    const { idUsuario } = req.params;

    try {
        const userExisting = await knex('usuarios')
            .where({ id: idUsuario })
            .first();

        if (!userExisting) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado' })
        }

        const restaurantExisting = await knex('restaurantes')
            .where({ id: idRestaurant })
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
        const startOfWeekDate = startOfWeek(currentDate);
        const endOfWeekDate = endOfWeek(currentDate);

        const winnerRestaurantWeek = await knex('vencedores')
            .select('restaurante_id')
            .whereBetween('data_voto', [startOfWeekDate, endOfWeekDate])
            .groupBy('restaurante_id')

        const voteExisting = await knex('votacao')
            .where({
                usuario_id: idUsuario,
                data_voto: currentDate
            })
            .first();

        for (let week of winnerRestaurantWeek) {
            if (week.restaurante_id === idRestaurant) {
                return res.status(400).json({ mensagem: 'Esse restaurante não pode receber voto nessa semana' })
            }
        }

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
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const computeVotes = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDayDate = startOfDay(currentDate);
        const endOfDayDate = endOfDay(currentDate);

        const sizeUsers = await knex('usuarios')
            .count('* as total');

        const sizeVotes = await knex('votacao')
            .count('* as total')
            .whereBetween('data_voto', [startOfDayDate, endOfDayDate]);;

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

        if (mostVotedRestaurants.length > 1) {
            return res.status(200).json({
                mensagem: 'Empate nos votos entre vários restaurantes mais votados',
                restaurantes_empatados: winnerRestaurants
            });
        }

        if (sizeVotes[0].total < sizeUsers[0].total) {
            return res.status(404).json({ mensagem: 'Nem todos os usuários votaram' });
        }

        if (sizeVotes[0].total === sizeUsers[0].total) {
            const resultComputade = await knex('vencedores')
                .insert({
                    restaurante_id: winnerRestaurants[0].restaurante_id,
                    data_voto: currentDate
                })
                .returning('*');
            return res.status(200).json({ restaurante_mais_votado: winnerRestaurants[0] });
        }

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    registerVote,
    computeVotes
};