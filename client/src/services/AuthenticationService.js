import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  getUserID (credentials) {
    return Api().get('/admin/getUserID', credentials)
  },
  deleteUser (credentials) {
    return Api().post('/admin/deleteUser', credentials)
  },
  getAdmin (credentials) {
    return Api().get('/admin/get', credentials)
  },
  getBook (credentials) {
    return Api().get('/librarian/get', credentials)
  }

}
