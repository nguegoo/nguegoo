const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Produit = require('./Produit')
const User = require('./User')
const Model = Sequelize.Model

class Pannier extends Model {}

module.exports = Pannier.init({
    quantite: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    etat: {
        type: Sequelize.STRING,
        defaultValue: "nl",
        max: 3

    },
    statut: {
        type: Sequelize.STRING,
        defaultValue: "ec",
        max: 3
    }
}, {
    sequelize,
    modelname: 'Pannier'
})
Pannier.belongsTo(Produit)
Produit.hasMany(Pannier)

Pannier.belongsTo(User)
User.hasMany(Pannier)