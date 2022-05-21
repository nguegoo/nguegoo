const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Model = Sequelize.Model


class CategorieGrossiste extends Model{}
CategorieGrossiste.init(
    {
        designation:{

            type: Sequelize.STRING
        }
    },
    {
        sequelize,
        modelName: 'CategorieGrossiste'
    }
)
module.exports = CategorieGrossiste


