const Sequelize = require('sequelize')
const config = require('./config')


var sequelize = new Sequelize(
    config.db.dbname,
    config.db.dbuser,
    config.db.dbpass,
    config.db.options
)

module.exports = sequelize
