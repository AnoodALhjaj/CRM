import { createStore } from 'vuex'

export default createStore({
  state: {
    isloading: false,
    isAuth: false,
    token: ''
  },
  mutations: {
    initStorage(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuth = true
      } else {
        state.token = ''
        state.isAuth = false
      }
},
setLoading(state, status) {
  state.isloading = status
},
setToken(state, token) {
  state.token = token
  state.isAuth = true
},
removeToken(state) {
  state.token = ''
  state.isAuth = false
}
  },
  actions: {
  },
  modules: {
  }
})
