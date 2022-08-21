import Api from './Api'
export default {
    //add
    addPanier (token, data) {
        return Api().post('/panier/add', data, {
            headers: {
                authorization: token
            }
        })
    },

    // list
    allCartProducts (id) {
        return Api().get('/panier/allCartProducts', {
            params: {
                userId: id
            }
        })
    },

    // delete product on then cart
    deleteCartProduct (id) {
        return Api().delete('/panier/delete', {
            params: {
                id: id
            }
        })
    },
    getCommandLigne(userId, token, statut) {
        return Api().get('/panier/client-ligne-commande', {
            params: {
                userId: userId,
                statut: statut
            },
            headers: {
                authorization: token
            }
        })
    },

    validerCommande(commandes) {
        return Api().put('/panier/valider', {commandes})
    },
    // soumission de la commande(sans payement)
    soumission_commande(data) {
        return Api().post('/panier/valider-client', data)
    }
}