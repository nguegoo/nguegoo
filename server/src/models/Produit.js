const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Grossiste = require('./Grossiste')
const CategorieProduit = require('./CategorieProduit')
const Model = Sequelize.Model

class Produit extends Model {}

Produit.init({

    designation: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    quantite: {
        type: Sequelize.INTEGER
    },
    pvu: {
        type: Sequelize.INTEGER
    },
    image: {
        type: Sequelize.STRING
    },
    emballage: {
        type: Sequelize.STRING
    },

}, {
    sequelize,
    modelName: 'Produit'
})



/**
 * Un produit appartient à un et un seul utilisateur
 * A un utilisateur, peuvent appartenir zéro ou plusieurs produits
 */
Produit.belongsTo(Grossiste)
Grossiste.hasMany(Produit)

Produit.belongsTo(CategorieProduit)
CategorieProduit.hasMany(Produit)

module.exports = Produit