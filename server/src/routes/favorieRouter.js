const express = require('express')
const Router = express.Router()
const FavorieController = require('../controllers/favorie.controller')

Router.post('/add', FavorieController.ajoutFavorie)



module.exports = Router