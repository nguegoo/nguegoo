const SecteurActivite = require('../models/SecteurActivite')
const Grossiste = require('../models/Grossiste')
const User = require('../models/User')
module.exports = {
    //Ajouter un secteur d'activité
    add(req, res) {
        const { designation } = req.body
        SecteurActivite.create({
            designation: designation
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(500).send(error)
        })

    },
    //Lister les secteurs d'activité
    list(req, res) {
        SecteurActivite.findAll()
            .then(result => {
                res.send(result)
            }).catch(err => {
                res.status(500).send(err)
            })

    },
    //Modifier un secteur d'activité
    update(req, res) {
        const idCate = req.query.id
        const designation = req.body.designation
        SecteurActivite.update({
                designation: designation
            }, {
                where: {
                    id: idCate
                }
            })
            .then(result => {
                res.send(result)
            }).catch(error => {
                res.status(500).send(error)
            })

    },
    //Supprimer un secteur d'activité
    delete(req, res) {
        let idCate = req.query.id
        SecteurActivite.destroy({
            where: {
                id: idCate
            }
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(500).send(error)
        })
    },
    //Liste des grossistes par secteur d'activité
    listeByActivite(req, res) {
        let id = req.query.id
        SecteurActivite.findOne({
            where: {
                id: id
            },
            include: [{ model: Grossiste }]
        }).then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send(err)
        });
    },
    //Liste des secteurs d'activité par catégorie de produit


}