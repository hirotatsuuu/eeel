import firebase from '~/plugins/firebase'

export default function ({ store, route, redirect }) {
  console.log('authenticated')
  if (!store.getters['user/isAuthenticated']) {
    redirect('/account/login')
  } else {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        redirect('/account/login')
      }
    })
  }
}