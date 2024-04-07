const joi = require('joi')

const voteSchema = joi.object({
    idRestaurant: joi.number().integer().messages({
        'number.base': 'O campo restaurante deve ser um número',
    }),
})

module.exports = voteSchema