import Api from './Api'
export default {
    //add
    addPanier (token, data) {
        return Api().post('/pannier/add', data, {
            headers: {
                authorization: token
            }
        })
    },

    // list
    allCartProducts (id) {
        return Api().get('/pannier/allCartProducts', {
            params: {
                userId: id
            }
        })
    },

    // delete product on then cart
    deleteCartProduct (id) {
        return Api().post('/pannier/deleteProductOnTheCart', { id: id })
    }
}