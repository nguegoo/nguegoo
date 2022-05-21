const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const CategorieGrossiste =  require('../models/CategorieGrossiste')
const User = require('../models/User')
const Model = Sequelize.Model

class Grossiste extends Model { }

Grossiste.init(
    {
        entreprise: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        logo: {
            type: Sequelize.STRING
        },
        
        

    },
    {
        sequelize,
        modelName: 'Grossiste'
    }

)

Grossiste.belongsTo(CategorieGrossiste)
CategorieGrossiste.hasMany(Grossiste)

Grossiste.belongsTo(User)
User.hasMany(Grossiste)


module.exports = Grossiste