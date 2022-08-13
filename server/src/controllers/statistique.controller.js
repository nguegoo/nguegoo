const Grossiste = require('../models/Grossiste')
const User = require('../models/User')
const CategorieGrossiste = require('../models/SecteurActivite')
const Produit = require('../models/Produit')
const Panier = require('../models/Pannier')
const Partenaire = require('../models/Partenaire')

//Statistique de la base des données
//Nombre de grossiste
module.exports = {
    statistique(req, res) {
        let nbGrossiste = Grossiste.findAndCountAll({}).then((result) => {
            let nbCatGrossiste = CategorieGrossiste.findAndCountAll({}).then((result) => {
                let nbProduit = Produit.findAndCountAll({}).then((result) => {
                    let nbPanier = Panier.findAndCountAll({}).then((result) => {
                        let nbPartenaire = Partenaire.findAndCountAll({}).then((result) => {
                            let nbUser = User.findAndCountAll({}).then((result) => {
                                console.log('Les grossiste : ' + nbGrossiste + "\n les utilisateurs : " + nbUser + "\n les produits : " + nbProduit)
                            }).catch((err) => {

                            });
                        }).catch((err) => {

                        });
                    }).catch((err) => {

                    });
                }).catch((err) => {

                });
            }).catch((err) => {

            });
        }).catch((err) => {

        });






    }
}