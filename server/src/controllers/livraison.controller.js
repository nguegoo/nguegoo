var Livraison = require('../models/Livraison')
const Pannier = require('../models/Pannier')
const Partenaire = require('../models/Partenaire')
module.exports = {
    addLivraison(req, res) {
        let { PartenaireId, PannierId } = req.body
        Livraison.create({
            PartenaireId: PartenaireId,
            PannierId: PannierId
        }).then((livraison) => {
            res.status(200).send(livraison)
        }).catch((err) => {
            res.status(500).send(erro)
        });
    },

    listeLivraison(req, res) {
        Livraison.findAll({
            include: [
                { model: Pannier },
                { model: Partenaire }
            ]
        }).then((livraison) => {
            res.status(200).send(livraison)
        }).catch((err) => {
            res.status(500).send(err)
        });
    },

    updateLivraison(req, res) {
        let livraison = req.body
        Livraison.update({
            PartenaireId: livraison.PartenaireId,
            PannierId: livraison.PannierId,
            where: {
                id: livraison.id
            }
        }).then((livraison) => {
            res.status(200).send({ message: "Modification éffectué avec succès!" })
        }).catch((err) => {
            res.status(500).send({ message: "La Modification a échoué " })
        });
    },


}