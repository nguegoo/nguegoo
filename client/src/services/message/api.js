import messageService from '../messageService'
export default {
    sendMessage (sender, recepter, message) {
        let response = { 
            data: null,
            statut: {
                value: null,
                message: null
            }
        }
       messageService.sendMessage(sender, recepter, message)
      .then((result) => {
          response.data = result.data.message
          response.statut.value = 200
      }).catch((err) => {
          response.statut = 404
          response.message = err.response.data.error
      })

      return response
    }
  }