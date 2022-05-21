const Grossiste = require('../models/Grossiste')
const User = require('../models/User')
const CategorieGrossiste = require('../models/CategorieGrossiste')

module.exports = {
    addGrossiste(req, res) {
        console.log(req.body)
        const { entreprise, description, idCategorie, idUser } = req.body
        Grossiste.create({
            entreprise: entreprise,
            description: description,
            CategorieGrossisteId: idCategorie,
            UserId: idUser


        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.send(error)
        })

    },
    addUser(req, res) {
        const { prenom, nom, email, adresse, telephone, roleId } = req.body
        User.create({
            prenom: prenom,
            nom: nom,
            email: email,
            adresse: adresse,
            telephone: telephone,
            mdp: '1234',
            roleId: roleId
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.send(error)
        })

    },
    list(req, res) {

        Grossiste.findAll({
            include: [{
                    model: CategorieGrossiste
                },
                {
                    model: User
                }
            ],
        }).then((grossiste) => {
            console.log(grossiste)
            res.send(grossiste)
        }).catch((err) => {
            console.log(err)
            res.send(err)
        });

    },
    update(req, res) {
        const idGr = req.query.id
        const { entreprise, description, logo } = req.body

        Grossiste.update({
                entreprise: entreprise,
                description: description,
                logo: logo
            }, {
                where: {
                    id: idGr
                }
            })
            .then(result => {
                res.send(result)
            }).catch(err => {
                res.send(err)
            })

    },
    delete(req, res) {
        const idGr = req.query.id
        Grossiste.destroy({
            where: {
                id: idGr
            }
        }).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err)
        })

    }
}