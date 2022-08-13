const Grossiste = require('../models/Grossiste')
const User = require('../models/User')
const SecteurActivite = require('../models/SecteurActivite')
const Panier = require('../models/Pannier')
const passport = require('passport')
const hash = require('../policies/hash')
const jwt = require('../policies/jwtSigne')
module.exports = {

    addGrossiste(req, res) {
        const { entreprise, description, logo, idCategorie, idUser } = req.body
            // Récupérer et concatener tous les noms de fichiers images
            // var files = req.files
            // var image = []
            // files.forEach(file => {
            //     image.push(file.originalname)
            // })
            // logo = image.toString()

        Grossiste.create({
            entreprise: entreprise,
            description: description,
            logo: logo,
            SecteurActiviteId: idCategorie,
            UserId: idUser
        }).then(result => {
            res.send(result)
        }).catch(error => {
            res.status(500).send(error)
        })

    },
    addUser(req, res) {
        const { nom, email, adresse, telephone } = req.body
        hash.bHash('1234')
            .then((password) => {
                User.create({
                    nom: nom,
                    email: email,
                    adresse: adresse,
                    telephone: telephone,
                    mdp: password
                }).then(result => {
                    res.send(result)
                }).catch(error => {
                    res.status(500).send(error)
                })
            }).catch((err) => {
                res.send(err)
            });
    },
    list(req, res) {
        Grossiste.findAll({
            include: [{
                    model: SecteurActivite
                },
                {
                    model: User
                }
            ],
        }).then((grossiste) => {
            res.send(grossiste)
        }).catch((err) => {
            res.status(500).send(err)
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
            res.status(500).send(error)
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
                res.status(500).send(err)
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
            res.status(500).send(err)
        })

    },
    //Afficher la liste des clients d'un grossiste
    grossisteByClient(req, res) {
        let { idGrossiste } = req.query.id
        Grossiste.findAll({
            where: {
                GrossisteId: idGrossiste
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
            res.status(500).send(error)
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
                }).catch((error) => {
                    res.status(500).send(info)
                });

            } else {
                res.status(500).send(info)
            }

        })(req, res, next)
    },
    grossisteBySecteurDactivite(req, res) {
        const { secteurId } = req.query

        Grossiste.findAll({
            where: {
                SecteurActiviteId: secteurId
            },
            include: [{
                model: User
            }]
        }).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        });
    }


}