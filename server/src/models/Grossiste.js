const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const CategorieGrossiste = require('./SecteurActivite')
const User = require('../models/User')
const Model = Sequelize.Model

class Grossiste extends Model {}

Grossiste.init({
        entreprise: {
            type: Sequelize.STRING,
            required: true,

        },
        description: {
            type: Sequelize.STRING,
            required: true
        },
        logo: {
            type: Sequelize.STRING
        },
        etat: {
            type: Sequelize.STRING,
            defaultValue: "A",
            max: 2
        }


    }, {
        sequelize,
        modelName: 'Grossiste'
    }

)

Grossiste.belongsTo(CategorieGrossiste)
CategorieGrossiste.hasMany(Grossiste)

Grossiste.belongsTo(User)
User.hasMany(Grossiste)


module.exports = Grossiste