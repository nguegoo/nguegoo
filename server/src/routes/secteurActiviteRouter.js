const express = require('express')
const Router = express.Router()
const SecteurActiviteController = require('../controllers/secteurActivite.controller')


Router.post('/add', SecteurActiviteController.add)
Router.get('/list', SecteurActiviteController.list)
Router.put('/update', SecteurActiviteController.update)
Router.delete('/delete', SecteurActiviteController.delete)


module.exports = Router