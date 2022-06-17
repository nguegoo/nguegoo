const Router = require('express').Router()
const pannierController = require('../controllers/pannierController')
const PannierController = require('../controllers/pannierController')

Router.post(
    '/add',
    PannierController.add
)

Router.get(
    '/liste',
    PannierController.listeByGrossiste
)

Router.get(
    '/pannier-detail',
    PannierController.pannierById
)

Router.put(
    '/update',
    PannierController.update
)

Router.delete(
    '/delete',
    PannierController.delete
)

Router.get(
    '/mes-commandes',
    PannierController.clientPanier
)

Router.get('/ma-commande', pannierController.maCommande)



module.exports = Router