import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      auth: null,
      user: null
    }),
    mutations: {
      setUser(state, user) {
        state.user = user
        state.auth = !(user === null)
      }
    }
  })
}

export default createStore