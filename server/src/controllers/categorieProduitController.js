var CategorieProduit = require('../models/CategorieProduit')
const Grossiste = require('../models/Grossiste')
const Produit = require('../models/Produit')

module.exports = {
    //Ajouter une categorie
    add(req, res) {

        let { designation } = req.body
        CategorieProduit.create({
            designation: designation
        }).then(response => {
            res.send(response)
        }).catch(error => {
            console.log(error)
            res.status(404).send(error)
        })
    },

    //Afficher une categorie
    categorieProduitById(req, res) {
        const { idCategori } = req.query
        console.log("L'identifiant est : " + id)
        CategorieProduit.findOne({
                where: { id: idCategori }
            })
            .then(response => {
                res.status(200).send(response)
            }).catch(error => {
                res.status(500).send(error)
            })
    },

    //Modifier une categorie produit
    update(req, res) {
        const { id } = req.query
        const { designation } = req.body
        if (!designation) {
            res.send({ message: "Veuillez saisir la designation!" })
        } else {
            CategorieProduit.update({
                designation: designation
            }, {
                where: { id: id }
            }).then(response => {
                req.send({ message: "Modification effecué avec succès" })
            }).catch(error => {
                res.status(404).send({ message: "La modification a échoué : " + error })
            })
        }
    },

    //Liste des categories produits
    liste(req, res) {
        CategorieProduit.findAll()
            .then(categorieProduits => {
                res.send(categorieProduits)
            }).catch(error => {

                res.status(500).send({ message: "Erreur d'affichage : " + error })
            })
    },

    //Categorie produit by grossiste
    categorieProduitByGrossiste(req, res) {
        let { idGrossiste } = req.query
        Produit.findAll({
            where: {
                GrossisteId: idGrossiste
            },
            include: [
                { model: CategorieProduit },
                { model: Grossiste }
            ]
        }).then((categorieProduit) => {
            res.send(categorieProduit)
        }).catch((error) => {
            res.status(500).send(error)
        });
    },
    //Les Produits d'une Categorie d'un grossiste
    ProduitByCategorieByGrossiste(req, res) {
        let { idGrossiste, idCategorie } = req.query
        if (idCategorie == 0) {
            Produit.findAll({
                where: {
                    GrossisteId: idGrossiste
                },
                include: [
                    { model: CategorieProduit },
                    { model: Grossiste }
                ]
            }).then((categorieProduit) => {
                res.send(categorieProduit)
            }).catch((error) => {
                res.status(500).send(error)
            });
        } else {
            Produit.findAll({
                where: {
                    GrossisteId: idGrossiste,
                    CategorieProduitId: idCategorie
                },
                include: [
                    { model: CategorieProduit },
                    { model: Grossiste }
                ]
            }).then((categorieProduit) => {
                res.send(categorieProduit)
            }).catch((error) => {
                res.status(500).send(error)
            });
        }
    },
    //Supprimer une categorie
    delete(req, res) {
        const { id } = req.query
        console.log(req.query)
        CategorieProduit.destroy({
            where: {
                id: id
            }
        }).then(response => {
            res.status(200).send({ "message": "Suppression effecué avec succès" })
        }).catch(error => {

            res.status(404).send({ message: "Erreur de supppression! " } + error)
        })
    }

}