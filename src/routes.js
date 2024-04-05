const express = require("express");
const { registerManager } = require("./controllers/managerController");
const validateRequest = require("./middlewares/validateRequest");

const managerSchema = require("./validations/managerSchema");

const route = express();


route.post("/administrador", validateRequest(managerSchema), registerManager);
//route.post("/login", validateRequest(loginSchema), login);


module.exports = route;