const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Model = Sequelize.Model

class Partenaire extends Model {}

Partenaire.init({
    nom: {
        type: Sequelize.STRING,
        unique: true,
        required: true
    },
    adresse: {
        type: Sequelize.STRING,
        required: true
    },
    telephone: {
        type: Sequelize.STRING,
        max: 15,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    engin: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'Partenaire'
})


module.exports = Partenaire