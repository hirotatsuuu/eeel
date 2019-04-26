export const state = () => ({
  user: null,
  userImage: null
})

export const mutations = {
  setUser (state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = null
    }
  },
  setUserImage (state, payload) {
    if (payload) {
      state.userImage = payload
    } else {
      state.userImage = null
    }
  }
}

export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  },
  setUserImage ({ commit }, payload) {
    commit('setUserImage', payload)
  }
}

export const getters = {
  user: state => {
    return state.user
  },
  isAuthenticated (state) {
    return !!state.user
  },
  userImage: state => {
    return state.userImage
  },
  isUserImage (state) {
    return !!state.userImage
  }
}