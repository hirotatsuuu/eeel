export default function ({ store, route, redirect }) {
  console.log('authenticated')
  console.log('use/user', store.getters['user/user'])
  if (!store.getters['user/isAuthenticated'] && route.name !== "login") {
    redirect('/login')
  }
  if (store.getters['user/isAuthenticated'] && route.name === "login") {
    redirect('/')
  }
}