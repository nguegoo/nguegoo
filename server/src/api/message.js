let Message = require('../models/Message')
module.exports = {

	sendMessage (data, callback) {
		Message.create({
			sender: data.sender,
			recepter: data.recepter,
			message: data.message
		}).then(message => {
			callback(null, message)
		}).catch(error => {
			callback(error, null)
		})
	}
}