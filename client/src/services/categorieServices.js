/**
 * Service pour gérer les catégories
 */
import Api from './Api.js'
export default {

    add (data) {
       return Api().post('/categorie/add', data)
    },
    list () {
        return Api().get('/categorie/liste')
    },
    listWithLimit (id) {
        return Api().get('/categorie/categorie-with-limit', { id: id })
    },
    deleteCategory (id) {
        return Api().delete('/categorie/delete', {
            params: {
                id: id
            }
        })
    },
    updateCategory (category) {
        return Api().put('/categorie/update', category, {
            params: {
                id: category.id
            }
        })
    }
}