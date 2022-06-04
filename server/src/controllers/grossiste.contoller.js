const Grossiste = require('../models/Grossiste')
const User = require('../models/User')
const CategorieGrossiste = require('../models/CategorieGrossiste')
const Panier = require('../models/Pannier')
const Produit = require('../models/Produit')
const CategorieProduit = require('../models/CategorieProduit')
const passport = require('passport')
const hash = require('../policies/hash')
const jwt = require('../policies/jwtSigne')
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
        const { prenom, nom, email, adresse, telephone } = req.body
        hash.bHash('1234')
            .then((password) => {
                User.create({
                    prenom: prenom,
                    nom: nom,
                    email: email,
                    adresse: adresse,
                    telephone: telephone,
                    mdp: password
                }).then(result => {
                    res.send(result)
                }).catch(error => {
                    res.send(error)
                })
            }).catch((err) => {
                res.send(err)
            });


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
    //Détail d'un grossite
    grossisteById(req, res) {
        let { id } = req.query
        Grossiste.findOne({
            where: {
                UserId: id
            },
            include: [
                { model: User }
            ]
        }).then((grossiste) => {
            res.send(grossiste)
        }).catch((error) => {
            res.status(404).send(error)
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

    },
    //Afficher la liste des clients d'un grossiste
    grossisteByClient(req, res) {
        let idUser = req.query.id
        Grossiste.findAll({

        }, {
            where: {
                UserId: idUser
            },
            include: [{
                    model: User
                },
                {
                    model: Panier
                }
            ]
        }).then((grossiste) => {
            res.send(grossiste)
        }).catch((error) => {
            res.status(404).send(error)
        });

    },
    login(req, res, next) {
        //console.log(req.body)
        passport.authenticate('local', function(err, user, info) {
            if (user) {
                Grossiste.findOne({
                    where: {
                        UserId: user.id
                    }
                }).then((result) => {
                    user.dataValues['grossisteId'] = result.dataValues.id
                        //console.log(user)
                    return res.send({
                        user: user,
                        token: jwt.generateAccessToken(user.dataValues)
                    })
                }).catch((err) => {

                });

            } else {
                res.status(400).send(info)
            }

        })(req, res, next)
    }

}