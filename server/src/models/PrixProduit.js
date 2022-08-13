const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Produit = require('./Produit')

class PrixProduit extends Sequelize.Model {}

PrixProduit.init({
    prix: {
        type: Sequelize.INTEGER,
        required: true
    }
}, {
    sequelize,
    modelName: "PrixProduit"
})

Produit.hasMany(PrixProduit)
PrixProduit.belongsTo(Produit)

module.exports = PrixProduit