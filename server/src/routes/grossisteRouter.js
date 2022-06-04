const express = require('express')
const Router = express.Router()
const GrossisteController = require('../controllers/grossiste.contoller')

Router.post('/add-user', GrossisteController.addUser)
Router.post('/add-grossiste', GrossisteController.addGrossiste)
Router.get('/liste', GrossisteController.list)
Router.put('/update', GrossisteController.update)
Router.delete('/delete', GrossisteController.delete)
Router.get('/detail-grossiste', GrossisteController.grossisteById)
Router.get('/mes-clients', GrossisteController.grossisteByClient)
Router.post('/login', GrossisteController.login)

module.exports = Router