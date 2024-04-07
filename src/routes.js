const express = require('express');

const { registerUser, detailUser } = require('./controllers/userController');
const { registerRestaurant, getRestaurant } = require('./controllers/restaurantController')
const login = require('./controllers/loginController')
const { registerVote, computeVotes } = require('./controllers/voteController')

const validateRequest = require('./middlewares/validateRequest');
const authenticatedUser = require('./middlewares/authenticated')

const userSchema = require('./validations/userSchema');
const restaurantSchema = require('./validations/restaurantSchema')
const loginSchema = require('./validations/loginSchema')
const voteSchema = require('./validations/voteSchema')

const route = express();

route.get('/restaurantes', getRestaurant)

route.post('/usuario', validateRequest(userSchema), registerUser);
route.post('/login', validateRequest(loginSchema), login);

route.use(authenticatedUser);

route.get('/usuario/:id', detailUser)

route.post('/restaurantes', validateRequest(restaurantSchema), registerRestaurant);

route.post('/votacao/:idUsuario', validateRequest(voteSchema), registerVote);
route.get('/resultadovotacao', computeVotes)


module.exports = route;