export const strict = false

export const state = () => ({
  user: null,
})

export const mutations = {
  setUser (state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = null
    }
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}