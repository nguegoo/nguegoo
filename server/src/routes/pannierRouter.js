const Router = require('express').Router()
const PannierController = require('../controllers/pannierController')

Router.post(
    '/add',
    PannierController.add
)

Router.get(
    '/liste',
    PannierController.liste
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

module.exports = Router