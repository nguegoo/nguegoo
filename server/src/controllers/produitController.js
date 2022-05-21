var Produit = require('../models/Produit')
let User = require('../models/User')
var bodyParser = require('body-parser')
var app = require("express")()
const CategorieProduit = require('../models/CategorieProduit')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

module.exports = {

    // Ajout
    add(req, res, next) {
        console.log(req.body)
        console.log(req.file)
        let { designation, description, pvu, emballage, quantite, CategorieId } = req.body

        // Récupérer et concatener tous les noms de fichiers images
        var files = req.files
        var image = []
        files.forEach(file => {
            image.push(file.originalname)
        })
        image = image.toString()

        // Ajout
        Produit.create({
            //UserId: req.user.id,
            designation: designation,
            description: description,
            pvu: pvu,
            quantite: quantite,
            emballage: emballage,
            image: image,
            CategorieProduitId: CategorieId
        }).then(response => {
            res.send(response)
        }).catch(error => {
            res.status(400).send(error)
        })
    },
    //Information du produit par son id
    productById(req, res) {
        const { id } = req.query
        console.log(req.body)
        Produit.findOne({
            where: {
                id: id
            }
        }).then(produit => {
            res.send(produit)
        }).catch(error => {
            res.send(error => {
                res.send({ error: error })
            })
        })
    },
    // Liste
    liste(req, res) {

        Produit.findAll({
                include: [{
                    model: CategorieProduit
                }]
            })
            .then(produits => {
                res.send(produits)
            }).catch(error => {
                res.status(400).send(error)
            })
    },

    update(req, res, next) {
        /*console.log(req.body)
        console.log(req.files)
        console.log("update")*/
        if (req.files.length == 0) {
            const { id } = req.query
            const { designation, description, pvu, emballage, quantite, CategorieId } = req.body
            Produit.update({
                designation: designation,
                description: description,
                pvu: pvu,
                quantite: quantite,
                emballage: emballage,
                CategorieProduitId: CategorieId
            }, {
                where: { id: id }
            }).then(response => {
                res.send(response)
            }).catch(error => {
                res.status(400).send(error)
            })
        } else {
            var files = req.files
            var image = []
            files.forEach(file => {
                image.push(file.originalname)
            })
            image = image.toString()
            const { id } = req.query
            const { designation, description, pvu, emballage, quantite, CategorieId } = req.body
            Produit.update({
                designation: designation,
                description: description,
                quantite: quantite,
                pvu: pvu,
                emballage: emballage,
                image: image,
                CategorieProduitId: CategorieId
            }, {
                where: { id: id }
            }).then(response => {
                res.send(response)
            }).catch(error => {
                res.status(400).send(error)
            })
        }
    },



    //Supprimer un produit
    delete(req, res) {
        let { id } = req.query
        Produit.destroy({
                where: {
                    id: id
                }
            })
            .then(Produits => {
                res.send(Produits)
            }).catch(error => {
                res.status(400).send(error)
            })
    }

}