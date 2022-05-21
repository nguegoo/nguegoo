const Partenaire = require('../models/Partenaire')

module.exports = {

    //Ajouter un partenaire
    add(req, res) {
        console.log('Partenaire controller')
        let { nom, prenom, adresse, tel, email, typeEngin } = req.body
        Partenaire.create({
                nom: nom,
                prenom: prenom,
                adresse: adresse,
                tel: tel,
                email: email,
                typeEngin: typeEngin
            })
            .then((Partenaires) => {
                res.send(Partenaires)
            }).catch((error) => {
                res.status(404).send(error)
            });
    },
    //Afficher la liste des partenaires
    liste(req, res) {
        Partenaire.findAll({

            })
            .then((Partenaires) => {
                res.send(Partenaires)
            }).catch((error) => {
                res.status(404).send(error)
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
                res.status(404).send(error)
            });
    },
    //Modifier un partenaire
    update(req, res) {
        let { id } = req.query
        const { nom, prenom, adresse, tel, email, typeEngin } = req.body
        Partenaire.update({
                nom: nom,
                prenom: prenom,
                adresse: adresse,
                tel: tel,
                email: email,
                typeEngin: typeEngin
            }, {
                where: {
                    id: id
                }
            })
            .then((Partenaires) => {
                res.send(Partenaires)
            }).catch((error) => {
                res.status(404).send(error)
            });
    },

    //Supprimer un partenaire
    delete(req, res) {
        const { id } = req.query
        Partenaire.destroy({
                where: {
                    id: id
                }
            })
            .then((Partenaires) => {
                res.send(Partenaires)
            }).catch((error) => {
                res.status(404).send(error)
            });
    }
}