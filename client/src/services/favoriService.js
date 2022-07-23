import Api from './Api'
export default  {
    add(token, favori) {
        return Api().post('/favorie/add', favori, {
            headers: {
                authorization: token
            }
        })
    }
}