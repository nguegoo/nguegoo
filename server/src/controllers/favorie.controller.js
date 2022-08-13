const Favorie = require('../models/Favorie')
const User = require('../models/User')
const Grossiste = require('../models/Grossiste')
const jwt = require('../policies/jwtSigne')
const favorieUtility = require('../utils/favorieUtility')

module.exports = {
    ajoutFavorie(req, res) {
        const { GrossisteId } = req.body
        const token = req.headers.authorization
        const user = jwt.verifyToken(token)
        favorieUtility.estFavorie(user.id, GrossisteId, function(data, err) {
            if (data == null) {
                Favorie.create({
                    GrossisteId: GrossisteId,
                    UserId: user.id
                }).then((result) => {
                    res.send(result)
                }).catch((err) => {
                    res.status(500).send({ message: "Erreur d'ajout " })
                });
            } else {
                res.status(500).send({ message: "Déjà ajouté comme favorie!" })
            }
        })

    }
}