let User = require('../models/User')
let hash = require('../policies/hash')
const passport = require('passport')
const jwt = require('../policies/jwtSigne')

module.exports = {
    register(req, res) {
        const { prenom, nom, email, mdp, typeCompte } = req.body
        hash.bHash(mdp)
            .then(password => {
                User.create({
                    prenom: prenom,
                    nom: nom,
                    email: email,
                    mdp: password,
                    typeCompte: typeCompte
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
            pays: user.pays,
            ville: user.ville,
            adresse: user.adresse
        }, {
            where: {
                id: user.id
            }
        }).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(400).send(err)
        })
    }
}