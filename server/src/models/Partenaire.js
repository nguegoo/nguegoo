const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Model = Sequelize.Model

class Partenaire extends Model {}

Partenaire.init({
    nom: {
        type: Sequelize.STRING
    },
    prenom: {
        type: Sequelize.STRING
    },
    adresse: {
        type: Sequelize.STRING
    },
    tel: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    typeEngin: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'Partenaire'
})


module.exports = Partenaire