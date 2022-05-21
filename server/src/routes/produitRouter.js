const Router = require('express').Router()
let produitController = require('../controllers/produitController')
let upload = require('../api/upload')("./src/public/media/produits/")
    //const jwt = require('../policies/jwtSigne')



// Ajout d'un produit
Router.post('/add',
    //jwt.authenticateToken,
    upload.array('files', 4),
    produitController.add
)

// List des produits
Router.get('/liste', produitController.liste)

//Afficher un seul produit
Router.get(
        '/productById',
        produitController.productById
    )
    // update
Router.put('/update', upload.array('files', 4), produitController.update)

//delete
Router.delete('/delete', upload.none(), produitController.delete)

module.exports = Router