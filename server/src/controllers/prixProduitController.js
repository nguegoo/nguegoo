const PrixProduit = require('../models/PrixProduit')
const prixProduit = require('../models/PrixProduit')

module.exports = {

    listePrix(req, res) {
        var { idProduit } = req.query
        PrixProduit.findAll({

        }, {
            where: {
                ProduitId: idProduit
            }
        }).then((result) => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send(err)
        });
    }
}