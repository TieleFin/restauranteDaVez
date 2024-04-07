const joi = require('joi')

const restaurantSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório'
    }),
    cep: joi.string().length(8).pattern(/^\d+$/).required().messages({
        'any.required': 'O campo CEP é obrigatório',
        'string.empty': 'O campo CEP não pode estar vazio',
        'string.length': 'O campo CEP deve ter 8 caracteres',
        'string.pattern.base': 'O campo CEP deve conter apenas números',
    }),
    rua: joi.string().required().messages({
        'any.required': 'O campo rua é obrigatório',
        'string.empty': 'O campo rua é obrigatório'
    }),
    numero: joi.number().integer().min(1).messages({
        'number.base': 'O campo numero deve ser um número',
        'number.min': 'Numero deve ser maior ou igual a 1'
    }),
    bairro: joi.string().required().messages({
        'any.required': 'O campo bairro é obrigatório',
        'string.empty': 'O campo bairro é obrigatório'
    }),
    cidade: joi.string().required().messages({
        'any.required': 'O campo cidade é obrigatório',
        'string.empty': 'O campo cidade é obrigatório'
    }),
    estado: joi.string().required().min(2).max(2).messages({
        'any.required': 'O campo bairro é obrigatório',
        'string.empty': 'O campo bairro é obrigatório',
        'string.min': 'O campo estado deve ser em sigla',
        'string.max': 'O campo estado deve ser em sigla',
    }),
});

module.exports = restaurantSchema