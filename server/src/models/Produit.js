const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')
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
Produit.belongsTo(User)
User.hasMany(Produit)

Produit.belongsTo(CategorieProduit)
CategorieProduit.hasMany(Produit)

module.exports = Produit