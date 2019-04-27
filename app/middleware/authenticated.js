import firebase from '~/plugins/firebase'

export default function ({ store, route, redirect }) {
  console.log('authenticated')
  if (!store.getters['user/isAuthenticated']) {
    redirect('/account/login')
  } else {
    firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged', user)
      if (!user) {
        redirect('/account/login')
      } else {
        store.commit('user/setUser', {
          uid: user.uid,
          email: user.email,
          username: user.displayName,
          userImage: user.photoURL,
        })
      }
    })
  }
}