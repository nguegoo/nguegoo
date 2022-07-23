import Api from './Api'

export default {

    add (accessToken, data) {
        return Api().post('/produit/add' , data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': accessToken
            }
        })
    },
    // List all
    list () {
        return Api().get('/produit/liste')
    },

    // List user's products
    userProductsList(accessToken) {
        return Api().get('/produit/liste', {
            headers: {
                'authorization': accessToken
            }
        })
    },
    listWithLimit (limitCount) {
        return Api().post('/produit/list-with-limit',  { limit: limitCount })
    },
    // Liste de tous les produits avec une limite et un offset
    listWithLimitAndOffset (data) {
      return Api().post('/produit/list-limit-offset', data)
    },
    // Pagination
    pagination (data) {
        return Api().post('/produit/pagination', data)
    },
    // get all by categoriy id
    productByCategory (data) {
        return Api().post('/produit/productbycategory', data)
    },
    productById (id) {
        return Api().post('/produit/getById', { id: id })
    },
    // update
    update (data) {
        return Api().post('/produit/modify', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    // Delete
    deleteProduct (id) {
        return Api().post('/produit/deleteProduct', id)
    },
    // list with limit and category
    listWithLimitAndCategory (limit, categoryId) {
        return Api().get('/produit/product-with-limit-and-category', {
            params: {
                limit: limit,
                categoryId: categoryId
            }
        })
    }
}