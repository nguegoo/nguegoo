const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const User = require('../models/User')
const Grossiste = require('../models/Grossiste')
const { hasMany, belongsTo } = require('./SecteurActivite')
const Model = Sequelize.Model

class Favorie extends Model {}

Favorie.init({

}, {
    sequelize,
    modelName: 'Favorie'
})
Favorie.belongsTo(User)
User.hasMany(Favorie)

Favorie.belongsTo(Grossiste)
Grossiste.hasMany(Favorie)

module.exports = Favorie