const express = require('express')
const secteurActiviteController = require('../controllers/secteurActivite.controller')
const Router = express.Router()
const SecteurActiviteController = require('../controllers/secteurActivite.controller')


Router.post('/add', SecteurActiviteController.add)
Router.get('/list', SecteurActiviteController.list)
Router.put('/update', SecteurActiviteController.update)
Router.delete('/delete', SecteurActiviteController.delete)
Router.get('/secteur', secteurActiviteController.listeByActivite)

module.exports = Router