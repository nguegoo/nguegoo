const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Model = Sequelize.Model

class Partenaire extends Model {}

Partenaire.init({
    nom: {
        type: Sequelize.STRING
    },
    adresse: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    engin: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'Partenaire'
})


module.exports = Partenaire