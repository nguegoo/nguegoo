var Sequelize = require('sequelize')
var sequelize = require('../config/database')

class Message extends Sequelize.Model {}

Message.init(
	{
		sender: Sequelize.STRING,
		recepter: Sequelize.STRING,
		message: Sequelize.TEXT
	},
    {
    	sequelize,
    	ModelName: 'Message'
    }
)

module.exports = Message
