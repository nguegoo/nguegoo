import Api from './Api'

export default {
  addSubCategory (data) {
    return Api().post('/sub-category/add-sub-category', data, 
    {
      headers: {
        'Content-Type': 'Multipart/form-data'
      }
    })
  },
  listAllSubCategories () {
    return Api().get('/sub-category/all-subcategory')
  },
  listByCatId(data) {
    return Api().post('/sub-category/getby-catid', data)
  },
  updateSubCategory (data) {
    return Api().post('/sub-category/update-subcategory', data)
  },
  deleteSubCategory (data) {
    return Api().post('/sub-category/delete-subcategory', data)
  }
}