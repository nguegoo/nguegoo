/** Socket api **/
let message = require('./message')
let users = []
module.exports = (io) => {

	io.on('connection', (socket) => {
		console.log('user connected with id: ' + socket.id)
		//users[socket.id] = 
		//message client - vendeur
		socket.on('send-message', (data) => {
			message.sendMessage(data, (error, message) => {
				console.log(message)
			})
		})
	})

}