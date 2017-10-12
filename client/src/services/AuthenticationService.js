import Api from '@/services/Api'

export default {
  register (data) {
    return Api().post('register', data)
  },
  login (data) {
    return Api().post('login', data)
  },
  // admin
  getUserID (data) {
    return Api().get('/admin/getUserID', data)
  },
  deleteUser (data) {
    return Api().post('/admin/deleteUser', data)
  },
  updateUser (data) {
    return Api().post('/admin/updateUser', data)
  },
  getAdmin (data) {
    return Api().get('/admin/get', data)
  },
  // librarian
  createBook (data) {
    return Api().post('/librarian/createBook', data)
  },
  deleteBook (data) {
    return Api().post('/librarian/deleteBook', data)
  },
  updateBook (data) {
    return Api().post('/librarian/updateBook', data)
  },
  getBook (data) {
    return Api().get('/librarian/get', data)
  },
  // reader
  createComment (data) {
    return Api().post('/reader/createComment', data)
  },
  deleteComment (data) {
    return Api().post('/reader/deleteComment', data)
  },
  updateComment (data) {
    return Api().post('/reader/updateComment', data)
  },
  getComment (data) {
    return Api().post('/reader/get', data)
  },
  checkoutBook (data) {
    return Api().post('/reader/checkout', data)
  },
  returnBook (data) {
    return Api().post('/reader/return', data)
  }

}
