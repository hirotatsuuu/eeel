export const state = () => ({
  post: null,
  posts: null,
  pid: null
})

export const mutations = {
  setPosts (state, payload) {
    if (payload) {
      state.posts = payload
    } else {
      state.posts = null
    }
  },
  setPost (state, payload) {
    if (payload) {
      state.post = payload
    } else {
      state.post = null
    }
  },
  setPid (state, payload) {
    if (payload) {
      state.pid = payload
    } else {
      state.pid = null
    }
  }
}

export const actions = {
  setPosts ({ commit }, payload) {
    commit('setPosts', payload)
  },
  setPost ({ commit }, payload) {
    commit('setPost', payload)
  },
  setPid ({ commit }, payload) {
    commit('setPid', payload)
  }
}

export const getters = {
  posts: state => {
    return state.posts
  },
  post: state => {
    return state.post
  },
  pid: state => {
    return state.pid
  }
}