const Router = require('express').Router()
var categorieProduitControler = require('../controllers/categorieProduitController')
    //const categorieProduitSecurity = require('../policies/jwtSigne')


console.log('Categorie produit router')
Router.post(
    '/add',
    categorieProduitControler.add
)

Router.get(
    '/liste',
    categorieProduitControler.liste
)

Router.get(
    '/categorieProduitById',
    categorieProduitControler.categorieProduitById
)

Router.put(
    '/update',
    categorieProduitControler.update
)

Router.delete(
    '/delete',
    categorieProduitControler.delete
)


module.exports = Router