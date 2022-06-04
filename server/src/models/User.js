const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')

class User extends Model {}

User.init({
    nom: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    mdp: DataTypes.STRING,
    ville: DataTypes.STRING,
    quartier: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    typeCompte: DataTypes.STRING,
    etat: DataTypes.STRING
}, {
    sequelize,
    modelName: 'User'
})



module.exports = User