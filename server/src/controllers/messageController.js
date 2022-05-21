var Message = require('../models/Message')
module.exports = {

	addMessage (req, res) {
		const { sender, recepter , message } = req.body
		console.log(req.body)
		Message.create({
			sender: sender,
			recepter: recepter,
			message: message
		}).then(message => {
			console.log(message)
			res.send({ message: message })
		}).catch(error => {
			res.send({ error: error })
		})
	}
}