import Api from './Api'
export default {
  sendMessage (sender, recepter, message) {
    return Api().post('/message/addMessage', {
      sender: sender,
      recepter: recepter,
      message: message
    })
  }
}