const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')
const Produit = require('./Produit')
const Model = Sequelize.Model

class Pannier extends Model {}

Pannier.init({
    quantite: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    },
}, {
    sequelize,
    modelName: 'Pannier'
})

/**
 * Un client fait un ou plusieur commande et une commande
 *  est faite par un et un seul client
 * Une comande contient un ou plusieur produit et un produit
 * est contenu dans une et une seule commande
 */
Pannier.belongsTo(User)
User.hasMany(Pannier)

Pannier.belongsTo(Produit)
Produit.hasMany(Pannier)

module.exports = Pannier