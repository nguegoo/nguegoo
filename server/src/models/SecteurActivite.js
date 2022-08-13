const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Model = Sequelize.Model


class SecteurActivite extends Model {}
SecteurActivite.init({
    designation: {

        type: Sequelize.STRING,
        required: true,
        unique: true
    }
}, {
    sequelize,
    modelName: 'SecteurActivite'
})
module.exports = SecteurActivite