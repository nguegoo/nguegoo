const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Model = Sequelize.Model
class CategorieProduit extends Model {}

CategorieProduit.init({
    designation: Sequelize.STRING
}, {
    sequelize,
    modelName: 'CategorieProduit'
})

module.exports = CategorieProduit