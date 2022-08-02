const Pannier = require('../models/Pannier');
const Produit = require('../models/Produit');
const User = require('../models/User')
const Grossiste = require('../models/Grossiste');
const jwtSigne = require('../policies/jwtSigne')
const pannierUtility = require('../utils/pannierUtility')
const produitController = require('../controllers/produitController')
const Sequelize = require('sequelize')
module.exports = {

    //Ajouter un panier

    add(req, res) {
        console.log('Pannier controller')
        const auth = req.headers.authorization
        let user = null
        try {
            user = jwtSigne.verifyToken(auth)
            const { ProduitId, quantite } = req.body
            Pannier.create({
                    ProduitId: ProduitId,
                    UserId: user.id,
                    quantite: quantite
                })
                .then((pannier) => {
                    res.send(pannier)
                }).catch((error) => {
                    res.status(404).send(error)
                });

        } catch (error) {
            res.status(500).send({ message: "vous n'êtes pas connecté" })
        }


    },
    //Afficher la liste des commandes d'un grossiste
    listeByGrossiste(req, res) {
        const auth = req.headers.authorization
        if (auth != null) {
            try {
                const user = jwtSigne.verifyToken(auth)
                produitController.commandeGrossiste(user.grossisteId, function(error, data) {
                    let produitsId = []
                    data.forEach(produit => {
                        produitsId.push(produit.dataValues.id)
                    });
                    Pannier.findAll({
                            group: ['statut', 'User.nom', 'User.ville', 'User.telephone', 'User.quartier', 'User.adresse'],
                            // attributes: [
                            //     'statut'

                            // ],
                            where: {
                                ProduitId: {
                                    [Sequelize.Op.in]: produitsId
                                }
                            },
                            include: [
                                { model: Produit },
                                { model: User }
                            ]
                        })
                        .then((panniers) => {
                            //console.log(panniers);
                            res.send(panniers)

                        }).catch((error) => {
                            console.log(error)
                            res.status(500).send(error)
                        })
                    console.log(produitsId)
                })
            } catch (error) {
                res.status(501).send({ message: 'token invalide' })
            }
        } else {
            res.status(500).send({ message: "Non autorisé" })
        }

    },
    //Afficher la liste des panier par client
    mesCommandes(req, res) {
        const auth = req.headers.authorization
        let user = null

        try {
            user = jwtSigne.verifyToken(auth)


            Pannier.findAll({
                    attributes: [
                        ['cretedAt', "DESC"]
                    ],
                    where: {
                        UserId: user.id
                    },
                    include: [{
                            model: Produit
                        },
                        {
                            model: User
                        }
                    ]
                })
                .then((panniers) => {
                    res.send(panniers)
                }).catch((error) => {
                    res.status(500).send(error)
                });
        } catch (error) {
            res.status(404).send({ message: "Non autorisé" })
        }

    },
    //Afficher les détail d'une commande
    pannierById(req, res) {
        const { id } = req.query
        const auth = req.headers.authorization
        let user = null
        try {
            user = jwtSigne.verifyToken(auth)
            Pannier.findOne({
                where: {
                    id: id,
                    UserId: user.id
                },
                include: [
                    { model: Produit },
                    { model: user },
                    { model: Grossiste }
                ]
            }).then((pannier) => {
                res.send(pannier)
            }).catch((error) => {
                res.status(500).send(error)
            });
        } catch (error) {
            res.status(404).send({ message: "Non autorisé" })
        }
    },
    // Modifier un panier
    update(req, res) {
        const { id } = req.query.id
        const { quantite } = req.body
        Pannier.update({
                quantite: quantite
            }, {
                where: {
                    id: id,
                    statut: "ec"
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
                    id: id,
                    statut: "ec",
                    etat: "nl"
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
        const auth = req.headers.authorization
        let user = null
        try {
            user = jwtSigne.verifyToken(auth)
            Pannier.findAll({
                where: {
                    UserId: user.id
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
                res.status(500).send(error)
            });
        } catch (error) {
            res.status(404).send({ message: "Non autorisé" })
        }

    },

    //Ma commande en cours
    maCommande(req, res) {
        const auth = req.headers.authorization
        let user = null
        try {
            user = jwtSigne.verifyToken(auth)
            Pannier.findAll({
                where: {
                    UserId: user.id,
                    statut: "ec"
                },
                include: [
                    { model: Produit },
                    { model: User }
                ]
            }).then((panier) => {
                res.send(panier)
            }).catch((error) => {
                res.status(500).send(error)
            });
        } catch (error) {
            res.status(404).send({ message: "Non autorisé" })
        }

    },

    //Ligne de commande d'un client pour un grossiste données
    ligneCommandeClient(req, res) {
        const auth = req.headers.authorization
        const { userId, statut } = req.query


        if (auth != null) {
            try {
                const user = jwtSigne.verifyToken(auth)
                produitController.commandeGrossiste(user.grossisteId, function(error, data) {
                    let produitsId = []
                    data.forEach(produit => {
                        produitsId.push(produit.dataValues.id)
                    });
                    Pannier.findAll({
                            attributes: [
                                ['createdAt', 'DESC'], 'id', 'quantite', 'etat', 'statut', 'ProduitId', 'UserId'

                            ],
                            where: {
                                ProduitId: {
                                    [Sequelize.Op.in]: produitsId
                                },
                                UserId: userId,
                                statut: statut
                            },
                            include: [
                                { model: Produit },
                                { model: User }
                            ]
                        })
                        .then((panniers) => {
                            res.send(panniers)

                        }).catch((error) => {
                            console.log(error)
                            res.status(500).send(error)
                        })
                    console.log(produitsId)
                })
            } catch (error) {
                res.status(501).send({ message: 'token invalide' })
            }
        } else {
            res.status(500).send({ message: "Non autorisé" })
        }

    },

    //Valider la commande
    validerCommande(req, res) {
        const { commandes } = req.body
        console.log(commandes);
        Pannier.update({
            statut: "T",

        }, {
            where: {
                id: {
                    [Sequelize.Op.in]: commandes.lignes
                }
            }
        }).then((result) => {
            commandes.details.forEach(prod => {
                Produit.findOne({}, {
                    where: {
                        id: prod.produitId
                    }
                }).then((prodExiste) => {
                    Produit.update({
                        quantite: prodExiste.dataValues.quantite - prod.quantite
                    }, {
                        where: {
                            id: prod.produitId
                        }
                    }).then((effectuer) => {
                        res.send(effectuer)
                    }).catch((err) => {
                        res.status(500).send(err)
                    });
                }).catch((err) => {

                });
            });
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        });
    }

}