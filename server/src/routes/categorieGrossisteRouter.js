const express = require('express')
const Router = express.Router()
const CategorieGrossisteController = require('../controllers/catagorieGrossiste.controller')


Router.post('/add', CategorieGrossisteController.add)
Router.get('/list', CategorieGrossisteController.list)
Router.put('/update', CategorieGrossisteController.update)
Router.delete('/delete', CategorieGrossisteController.delete)


module.exports = Router