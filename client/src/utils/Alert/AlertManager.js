export default {

    alertData: {
        type: 'info',
        show: false,
        message: 'test'
    },
    setAlertState(type, show, message) {
       this.alertData.type = type
       this.alertData.show = show
       this.alertData.message = message
    }
}