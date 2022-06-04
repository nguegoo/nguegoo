const Pannier = require('../models/Pannier');
const Produit = require('../models/Produit');
const User = require('../models/User')
const Grossiste = require('../models/Grossiste');
module.exports = {

    //Ajouter un panier
    add(req, res) {
        console.log('Pannier controller')
        const { ProduitId, UserId, quantite, date } = req.body
        var prod = Produit.findOne({
            where: {
                id: ProduitId
            }
        })
        if (prod.quantite > 0) {
            if (prod.quantite >= quantite) {
                Produit.update({
                    quantite: prod.quantite - quantite,
                    where: {
                        id: ProduitId
                    }
                })
                Pannier.create({
                        ProduitId: ProduitId,
                        UserId: UserId,
                        quantite: quantite,
                        date: date
                    })
                    .then((pannier) => {
                        res.send(pannier)
                    }).catch((error) => {
                        res.status(404).send(error)
                    });
            } else {
                res.send({ error: "Quantité indisponible" })
            }
        } else {
            res.send({ error: "Quantité insuffusant pour être commander" })
        }

    },
    //Afficher la liste des panier
    liste(req, res) {
        Pannier.findAll({
                include: [{
                        model: Produit
                    },
                    {
                        model: User
                    },
                    {
                        model: Grossiste
                    }
                ]
            })
            .then((panniers) => {
                res.send(panniers)
            }).catch((error) => {
                res.status(404).send(error)
            });
    },
    //Afficher les detail d'un panier
    pannierById(req, res) {
        const { id } = req.query

        Pannier.findOne({
            where: {
                id: id
            },
            include: [
                { model: Produit },
                { model: user },
                { model: Grossiste }
            ]
        }).then((pannier) => {
            res.send(pannier)
        }).catch((error) => {
            res.status(404).send(error)
        });
    },
    // Modifier un panier
    update(req, res) {
        const { id } = req.query.id
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

    },

    //Liste de mes commandes (client)
    clientPanier(req, res) {
        let idUser = req.query.id
        Pannier.findAll({

        }, {
            where: {
                UserId: idUser
            },
            include: [{
                    model: User
                },
                {
                    model: Produit
                }
            ]
        }).then((paniers) => {
            res.send(paniers)
        }).catch((error) => {
            res.status(404).send(error)
        });
    }

}