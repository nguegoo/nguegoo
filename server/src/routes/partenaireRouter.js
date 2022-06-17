const partenaireController = require('../controllers/partenaireController')
const Router = require('express').Router()

Router.post(
    '/add',
    partenaireController.add
)

Router.get(
    '/liste-des-commandes',
    partenaireController.liste
)

Router.get(
    'partenaireById',
    partenaireController.partenaireById
)

Router.put(
    '/update',
    partenaireController.update
)

Router.delete(
    '/delete',
    partenaireController.delete
)
module.exports = Router