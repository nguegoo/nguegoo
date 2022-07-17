var livraisonController = require('../controllers/livraison.controller')

var Router = require('express').Router()

Router.post('/add', livraisonController.addLivraison)

Router.get('/liste', livraisonController.listeLivraison)

Router.put('/update', livraisonController.updateLivraison)

module.exports = Router