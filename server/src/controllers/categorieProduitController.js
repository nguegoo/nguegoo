var CategorieProduit = require('../models/CategorieProduit')
var bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const app = require('express')()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

module.exports = {
    //Ajouter une categorie
    add(req, res) {
        console.log(req.body)
        let designation = req.body.designation
        CategorieProduit.create({
            designation: designation
        }).then(response => {
            res.send(response)
        }).catch(error => {
            console.log(error)
            res.status(500).send(error)
        })
    },

    //Modifier une categorie
    categorieProduitById(req, res) {
        const { id } = req.body.designation
        console.log("L'identifiant est : " + id)
        CategorieProduit.findOne({
                where: { id: id }
            })
            .then(response => {
                res.send({ categorieProduit: response })
            }).catch(erro => {
                res.send({ error: erro })
            })
    },

    //Modifier un produit
    update(req, res) {
        const { id } = req.query
        const { designation } = req.body
        CategorieProduit.update({
            designation: designation
        }, {
            where: { id: id }
        }).then(response => {
            res.send(response)
        }).catch(error => {
            res.status(404).send(error)
        })
    },

    //Liste des categories
    liste(req, res) {
        CategorieProduit.findAll({})
            .then(categorieProduits => {
                res.send(categorieProduits)
            }).catch(error => {
                res.status(404).send({ error: error })
            })
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
            res.send({ res: response })
        }).catch(error => {
            res.status(404).send({ error: error })
        })
    }

}