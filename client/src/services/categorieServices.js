/**
 * Service pour gérer les catégories
 */
import Api from './Api.js'
export default {

    add (data) {
       return Api().post('/categorie/categorie', data, {
           headers: {
                'Content-Type': 'multipart/form-data'
           }
       })
    },
    list () {
        return Api().get('/categorie/categories')
    },
    listWithLimit (id) {
        return Api().get('/categorie/categorie-with-limit', { id: id })
    },
    deleteCategory (id) {
        return Api().post('/categorie/destroy', { id: id })
    },
    updateCategory (category) {
        return Api().post('/categorie/update', category, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}