const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')

class User extends Model {}

User.init({
    nom: {
        type: DataTypes.STRING,
        required: true
    },
    telephone: {
        type: DataTypes.STRING,
        unique: true,
        max: 15
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        required: true
    },
    mdp: {
        type: DataTypes.STRING,
        required: true
    },
    ville: DataTypes.STRING,
    quartier: DataTypes.STRING,
    adresse: DataTypes.TEXT,
    typeCompte: DataTypes.STRING,
    etat: {
        type: DataTypes.STRING,
        defaultValue: "A"
    },
}, {
    sequelize,
    modelName: 'User'
})



module.exports = User