const Router = require('express').Router()
var categorieProduitControler = require('../controllers/categorieProduitController')
    //const categorieProduitSecurity = require('../policies/jwtSigne')


console.log('Categorie produit router')
    //Ajouter une categorie
Router.post(
        '/add',
        categorieProduitControler.add
    )
    //Liste des categorie
Router.get(
        '/liste',
        categorieProduitControler.liste
    )
    //Les informations d'une categorie donné
Router.get(
        '/categorieProduitById',
        categorieProduitControler.categorieProduitById
    )
    //Liste des produits par categorie et par grossiste
Router.get('/categorie-par-grossiste', categorieProduitControler.categorieProduitByGrossiste)
    //Produit par categorie et par grossiste
Router.get('/filtre', categorieProduitControler.ProduitByCategorieByGrossiste)
Router.put(
    '/update',
    categorieProduitControler.update
)

Router.delete(
    '/delete',
    categorieProduitControler.delete
)


module.exports = Router