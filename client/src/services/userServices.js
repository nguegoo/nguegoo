import Api from './Api'

export default {
    register (data) {
       return Api().post('/user/register', data)
    },

    login (credentials) {
     return Api().post('/user/login', credentials)
    },
    updateUserInfo(data) {
        return Api().put('/user/update', data)
    },
    // gestion de commande
    listeCommande(token, grossiste) {
        return Api().get('/panier/commande-dun-client',{
            params: {
                grossisteId: grossiste
            },
            headers: {
                authorization: token
            }
        })
    }
}