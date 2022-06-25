import AxiosApi from './Api'
export default {
  add(partenaire) {

    return AxiosApi().post('/partenaire/add', partenaire)
  },
  update(partenaire) {
    return AxiosApi().put('/partenaire/update', partenaire, {
      params: {
        id: partenaire.id
      }
    })
  },
  list() {
    return AxiosApi().get('/partenaire/liste')
  },
  delete(id) {
    return AxiosApi().delete('/partenaire/delete', {
      params: {
        id: id
      }
    })
  }
}