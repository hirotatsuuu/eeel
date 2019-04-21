import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
})

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

Vue.prototype.$firebase = firebase

export default (context, inject) => {
  firebase.auth().onAuthStateChanged(function(user) {
    context.app.store.commit('setUser', user)
  })
}