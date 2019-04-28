import createPersistedState from "vuex-persistedstate"

export default ({store, isHMR}) => {
  console.log("localstorage")
  if (isHMR) return
  if (process.client) window.onNuxtReady(() => createPersistedState()(store))
}