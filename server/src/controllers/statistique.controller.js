const Grossiste = require('../models/Grossiste')
const User = require('../models/User')
const CategorieGrossiste = require('../models/CategorieGrossiste')
const Produit = require('../models/Produit')
const Panier = require('../models/Pannier')
const Partenaire = require('../models/Partenaire')

//Statistique de la base des données
//Nombre de grossiste
module.exports = {
    statistique(req, res) {
        let nbGrossiste = Grossiste.findAndCountAll({})
        let nbCatGrossiste = CategorieGrossiste.findAndCountAll({})
        let nbProduit = Produit.findAndCountAll({})
        let nbPanier = Panier.findAndCountAll({})
        let nbPartenaire = Partenaire.findAndCountAll({})
        let nbUser = User.findAndCountAll({})
        console.log('Les grossiste : ' + nbGrossiste + "\n les utilisateurs : " + nbUser + "\n les produits : " + nbProduit)
    }
}