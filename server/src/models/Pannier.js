const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Produit = require('./Produit')
const User = require('./User')
const Model = Sequelize.Model
 
class Pannier extends Model{}

module.exports = Pannier.init(
  {
      quantite: Sequelize.INTEGER,
      etat: Sequelize.STRING
  },
  {
      sequelize,
      modelname: 'Pannier'
  } 
)
Pannier.belongsTo(Produit)
Produit.hasMany(Pannier)

Pannier.belongsTo(User)
User.hasMany(Pannier)