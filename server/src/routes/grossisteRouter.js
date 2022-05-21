const express = require('express')
const Router = express.Router()
const GrossisteController = require('../controllers/grossiste.contoller')

Router.post('/add-user', GrossisteController.addUser)
Router.post('/add-grossiste', GrossisteController.addGrossiste)
Router.get('/list', GrossisteController.list)
Router.put('/update', GrossisteController.update)
Router.delete('/delete', GrossisteController.delete)

module.exports = Router