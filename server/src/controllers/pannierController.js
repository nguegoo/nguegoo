const Pannier = require('../models/Pannier');
const Produit = require('../models/Produit');
const USer = require('../models/User')
module.exports = {

    add(req, res) {
        console.log('Pannier controller')
        const { ProduitId, UserId, quantite, date } = req.body
        Pannier.create({
                ProduitId: ProduitId,
                UserId: UserId,
                quantite: quantite,
                date: date
            })
            .then((result) => {
                res.send(result)
            }).catch((error) => {
                res.status(404).send(error)
            });
    },

    liste(req, res) {
        Pannier.findAll({
                include: [{
                    model: Produit,
                    model: User
                }]
            })
            .then((Panniers) => {
                res.send(Panniers)
            }).catch((error) => {
                res.status(404).send(error)
            });
    },

    pannierById(req, res) {
        const { id } = req.query

        Pannier.findOne({
            where: {
                id: id
            }
        })
    },

    update(req, res) {
        const { id } = req.query
        const { quantite } = req.body
        Pannier.update({
                quantite: quantite
            }, {
                where: {
                    id: id
                }
            })
            .then((panniers) => {
                res.send(panniers)
            }).catch((error) => {
                res.status(404).send(error)
            });
    },

    delete(req, res) {
        const { id } = req.query
        Pannier.destroy({
                where: {
                    id: id
                }
            })
            .then((panniers) => {
                res.send(panniers)
            }).catch((error) => {
                res.status(404).send(error)
            });

    }
}