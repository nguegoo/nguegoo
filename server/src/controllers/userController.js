let User = require('../models/User')
let hash = require('../policies/hash')
const passport = require('passport')
const jwt = require('../policies/jwtSigne')
const Favorie = require('../models/Favorie')
module.exports = {
    register(req, res) {
        const { nom, email, mdp, typeCompte, ville, quartier, etat, adresse } = req.body
        hash.bHash(mdp)
            .then(password => {
                User.create({

                    nom: nom,
                    email: email,
                    mdp: password,
                    typeCompte: typeCompte,
                    ville: ville,
                    quartier: quartier,
                    etat: etat,
                    adresse: adresse
                }).then(result => {
                    res.send({
                        user: result,
                        token: jwt.generateAccessToken(result.dataValues)
                    })
                }).catch(error => {
                    res.status(400).send({ error: `Un compte existe déjà avec cette adresse email` })
                })
            }).catch(err => {
                res.status(400).send({ error: `Nous n'avons pas pu hasher votre mot de passe !` })
            })
    },
    login(req, res, next) {
        //console.log(req.body)
        passport.authenticate('local', function(err, user, info) {
            if (user) {
                return res.send({
                    user: user,
                    token: jwt.generateAccessToken(user.dataValues)
                })
            }
            res.status(400).send(info)
        })(req, res, next)
    },
    updateUserInfo(req, res) {
        const { user } = req.body
        User.update({
            telephone: user.telephone,
            etat: user.etat,
            ville: user.ville,
            adresse: user.adresse,
            quartier: quartier,
            email: email
        }, {
            where: {
                id: user.id
            }
        }).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(400).send(err)
        })
    },

    //Ajouter une vaforie
    addFavorie(req, res) {
        let { GrossisteId } = req.query
        let UserId
        Favorie.create({
            UserId: UserId,
            GrossisteId: GrossisteId
        }).then((favories) => {
            res.send(favories)
        }).catch((error) => {
            res.status(404).send(error)
        });
    }
}