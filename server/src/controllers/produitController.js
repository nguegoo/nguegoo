var Produit = require('../models/Produit')
let User = require('../models/User')
var Grossiste = require('../models/Grossiste')
const CategorieProduit = require('../models/CategorieProduit')
const jwtSigne = require('../policies/jwtSigne')
const Favorie = require('../models/Favorie')

module.exports = {

    // Ajout
    add(req, res, next) {
        console.log(req.file)
        let { designation, description, pvu, emballage, quantite, CategorieId, GrossisteId } = req.body

        // Récupérer et concatener tous les noms de fichiers images
        var files = req.files
        var image = []
        files.forEach(file => {
            image.push(file.originalname)
        })
        image = image.toString()

        // Ajout
        Produit.create({
            GrossisteId: GrossisteId,
            designation: designation,
            description: description,
            pvu: pvu,
            quantite: quantite,
            emballage: emballage,
            image: image,
            CategorieProduitId: CategorieId
        }).then(response => {
            res.send(response)
        }).catch(error => {
            res.status(404).send(error)
        })

    },
    approvisionnement(req, res) {
        let { designation } = req.query.designation
        let { quantite } = req.body
        prod = Produit.findOne({ where: { designation: designation } })
        if (prod) {
            Produit.update({
                quantite: quantite + prod.quantite,
                where: {
                    designation: designation
                }
            }).then((result) => {
                res.status(200).send({ success: "Approvisionnement effectuer avec succè!" })
            }).catch((error) => {
                res.status(404).send({ error: "L'approvisionnement a échoué" })
            });
        } else {
            res.status(404).send("Le produit n'existe pas!, veuillez l'ajouter d'abord!")
        }
    },
    //Information du produit par son id
    productById(req, res) {
        const { id } = req.query
        console.log(req.body)
        Produit.findOne({
            where: {
                id: id
            },
            include: [{
                    model: Grossiste
                },
                {
                    model: CategorieProduit
                }
            ]
        }).then(produit => {
            res.send(produit)
        }).catch(error => {
            res.status(404).send({ message: "Erreur d'affichage : " + error })
        })
    },
    // Liste
    liste(req, res) {
        const auth = req.headers.authorization
        let user = null
        try {
            user = jwtSigne.verifyToken(auth)
            Produit.findAll({
                    where: {
                        GrossisteId: user.grossisteId
                    },
                    include: [{
                            model: CategorieProduit
                        },
                        {
                            model: Grossiste
                        }
                    ]
                })
                .then(produits => {
                    res.send(produits)
                }).catch(error => {
                    res.status(500).send(error)
                })
        } catch (error) {
            res.status(500).send({ message: 'Non authorisé' })
        }

    },

    update(req, res, next) {
        /*console.log(req.body)
        console.log(req.files)
        console.log("update")*/
        if (!designation || !pvu) {
            res.status(404).send({ message: "Tous les champs sont obligatoires" })
        } else {
            if (req.files.length == 0) {
                const { id } = req.query
                const { designation, description, pvu, emballage, quantite, CategorieId, GrossisteId } = req.body
                Produit.update({
                    designation: designation,
                    description: description,
                    pvu: pvu,
                    quantite: quantite,
                    emballage: emballage,
                    CategorieProduitId: CategorieId,
                    GrossisteId: GrossisteId
                }, {
                    where: { id: id }
                }).then(response => {
                    res.send(response)
                }).catch(error => {
                    res.status(400).send(error)
                })
            } else {
                var files = req.files
                var image = []
                files.forEach(file => {
                    image.push(file.originalname)
                })
                image = image.toString()
                const { id } = req.query
                const { designation, description, pvu, emballage, quantite, CategorieId, GrossisteId } = req.body
                Produit.update({
                    designation: designation,
                    description: description,
                    quantite: quantite,
                    pvu: pvu,
                    emballage: emballage,
                    image: image,
                    CategorieProduitId: CategorieId,
                    GrossisteId: GrossisteId
                }, {
                    where: { id: id }
                }).then(response => {
                    res.send(response)
                }).catch(error => {
                    res.status(400).send(error)
                })
            }
        }
    },

    //Liste des produits par grossiste et par categorie produit
    listeByGrossiste(req, res) {
        let id = req.query.id
        Produit.findAll({
            where: {
                GrossisteId: id
            },
            include: [{
                model: Grossiste
            }, {
                model: CategorieProduit
            }]
        }).then((produits) => {
            res.send(produits)
        }).catch((error) => {
            res.status(404).send(error)
        })


    },

    //Supprimer un produit
    delete(req, res) {
        let { id } = req.query
        Produit.destroy({
                where: {
                    id: id
                }
            })
            .then(Produits => {
                res.status(400).send({ message: "Suppression effectué avec succè:" })
            }).catch(error => {
                res.status(400).send({ message: "Suppression non effectué!" })

            })
    },

    //Grossite par produit
    grossisteByProduit(req, res) {
        const auth = req.headers.authorization
        let user = null
        try {
            user = jwtSigne.verifyToken(auth)
            Grossiste.findAll({
                where: {
                    GrossisteId: user.grossisteId
                },
                include: [{
                        model: Produit
                    },
                    { model: CategorieProduit }
                ]
            }).then((grossiste) => {
                res.send(grossiste)
            }).catch((error) => {
                res.status(404).send(error)
            });
        } catch (error) {
            res.status(404).send({ message: "Non autorisé" })
        }

    }


}