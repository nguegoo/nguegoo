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

//approvisionnement d'un produit
Router.post('/approvisionnement-produit', produitController.approvisionnement)
    // List des produits
Router.get('/liste', produitController.liste)

//Liste des produits en fonction des grossistes
Router.get('/produit-par-grossiste', produitController.listeByGrossiste)

//Afficher un seul produit
Router.get(
        '/productById',
        produitController.productById
    )
    // update
Router.put('/update', upload.array('files', 4), produitController.update)

//delete
Router.post('/delete', upload.none(), produitController.delete)

Router.get('/mes-produits', produitController.grossisteByProduit)
module.exports = Router