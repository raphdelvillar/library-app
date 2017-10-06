import Vue from 'vue'
import Router from 'vue-router'

// import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Admin from '@/components/Admin'
import Librarian from '@/components/Librarian'
import Reader from '@/components/Reader'

Vue.use(Router)

export default new Router({
  routes: [
/*
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
*/
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/librarian',
      name: 'Librarian',
      component: Librarian
    },
    {
      path: '/reader',
      name: 'Reader',
      component: Reader
    }
  ]
})
