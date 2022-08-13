const Partenaire = require('../models/Partenaire')

module.exports = {

    //Ajouter un partenaire
    add(req, res) {
        console.log('Partenaire controller')
        let { nom, adresse, telephone, email, engin } = req.body
        if (!nom || !adresse || !telephone) {
            res.status(404).send({ message: "Tous les champs sont obligatoires" })
        } else {
            Partenaire.create({
                    nom: nom,
                    adresse: adresse,
                    telephone: telephone,
                    email: email,
                    engin: engin
                })
                .then((Partenaires) => {
                    res.send(Partenaires)
                }).catch((error) => {
                    res.status(404).send(error)
                });
        }
    },
    //Afficher la liste des partenaires
    liste(req, res) {
        Partenaire.findAll({

            })
            .then((Partenaires) => {
                res.send(Partenaires)
            }).catch((error) => {
                res.status(500).send(error)
            });
    },
    //Recuperer les informations d'un partenaire
    partenaireById(req, res) {
        const { id } = req.query
        Partenaire.findOne({
                where: {
                    id: id
                }
            })
            .then((partenaire) => {
                res.send(partenaire)
            }).catch((error) => {
                res.status(500).send(error)
            });
    },
    //Modifier un partenaire
    update(req, res) {
        let { id } = req.query
        const { nom, adresse, telephone, email, engin } = req.body
        if (!nom || !adresse || !telephone) {
            res.status(404).send({ message: "Tous les champs sont obligatoires" })
        } else {
            Partenaire.update({
                    nom: nom,
                    adresse: adresse,
                    telephone: telephone,
                    email: email,
                    engin: engin
                }, {
                    where: {
                        id: id
                    }
                })
                .then((Partenaires) => {
                    res.send(Partenaires)
                }).catch((error) => {
                    res.status(500).send(error)
                });
        }
    },

    //Supprimer un partenaire
    delete(req, res) {
        const { id } = req.query
        Partenaire.destroy({
                where: {
                    id: id
                }
            })
            .then((partenaires) => {
                res.status(404).send({ message: "Suppression effectué avec succè!" })
            }).catch((error) => {
                res.status(404).send({ message: "Suppression non effectué! " + error })

            });
    }
}