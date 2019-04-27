export const state = () => ({
  user: null,
  userInfo: null
})

export const mutations = {
  setUser (state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = null
    }
  },
  setUserInfo (state, payload) {
    if (payload) {
      state.userInfo = payload
    } else {
      state.userInfo = null
    }
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setUserInfo ({ commit }, payload) {
    commit('setUserInfo', payload)
  }
}

export const getters = {
  user: state => {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  },
  userInfo: state => {
    return state.userInfo
  }
}