const Router = require('express').Router()
const pannierController = require('../controllers/pannierController')

Router.post(
    '/add',
    pannierController.add
)

Router.get(
    '/liste',
    pannierController.listeByGrossiste
)

Router.get(
    '/pannier-detail',
    pannierController.pannierById
)

Router.put(
    '/update',
    pannierController.update
)

Router.delete(
    '/delete',
    pannierController.delete
)

Router.get(
    '/mes-commandes',
    pannierController.clientPanier
)

Router.get('/ma-commande', pannierController.maCommande)

//Ligne commande d'un client pour un grossiste
Router.get('/client-ligne-commande', pannierController.ligneCommandeClient)

//Valider la commande
Router.put('/valider', pannierController.validerCommande)

module.exports = Router