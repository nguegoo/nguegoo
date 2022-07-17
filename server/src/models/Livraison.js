const Sequelize = require("sequelize")
const sequelize = require('../config/database')
const Partenaire = require('../models/Partenaire')
const Panier = require('../models/Pannier')

const Model = Sequelize.Model

class Livraison extends Model {}

Livraison.init({

}, {
    sequelize,
    modelName: 'Livraison'
})


Partenaire.hasMany(Livraison)
Livraison.belongsTo(Partenaire)

Panier.hasMany(Livraison)
Livraison.belongsTo(Panier)

module.exports = Livraison