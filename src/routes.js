const express = require('express');

const registerManager = require('./controllers/managerController');
const loginManager = require('./controllers/loginManagerController')


const validateRequest = require('./middlewares/validateRequest');
const authenticatedManager = require('./middlewares/authentication')

const managerSchema = require('./validations/managerSchema');
const loginSchema = require('./validations/loginSchema');

const route = express();


route.post('/administrador', validateRequest(managerSchema), registerManager);
route.post('/login', validateRequest(loginSchema), loginManager);

route.use(authenticatedManager);

module.exports = route;