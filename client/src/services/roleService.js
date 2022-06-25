import Api from './Api'

export default {
  add(role) {
    return Api().post('/role/add', role)
  },
  list() {
    return Api().get('/role/list')
  },
  update(role) {
    return Api().put('/role/update', role, {
      params: {
        id: role.id
      }
    })
  },
  delete(id) {
    return Api().delete('/role/delete', {
      params: {
        id: id
      }
    })
  }
}