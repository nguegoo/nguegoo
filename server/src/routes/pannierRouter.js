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
    '/pannierById',
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

module.exports = Router