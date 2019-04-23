export default function ({ store, route, redirect }) {
  if (!store.getters('user/isAuthenticated') && route.path != "/login") {
    redirect('/login')
  }
}