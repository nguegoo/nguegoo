const statistiqueController = require("../controllers/statistique.controller");
const Router = require('express').Router()

Router.get('/statistique', statistiqueController.statistique)

module.exports = Router