import Api from './Api'
export default {
    //add
    addPanier (data) {
        return Api().post('/pannier/addPannier', data)
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