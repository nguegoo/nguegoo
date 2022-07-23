import Api from './Api'

export default {
  add(categorie) {
    return Api().post('/secteur-activite/add', categorie)
  },
  list() {
    return Api().get('/secteur-activite/list')
  },
  update(categorie) {
    return Api().put('/secteur-activite/update', categorie, {
      params: {
        id: categorie.id
      }
    })
  },
  delete(id) {
    return Api().delete('/secteur-activite/delete', {
      params: {
        id: id
      }
    })
  }
}