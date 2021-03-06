import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
export { auth, db, storage }

const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()
const getIncrement = () => firebase.firestore.FieldValue.increment(1)
const getDecrement = () => firebase.firestore.FieldValue.increment(-1)
export { getTimestamp, getIncrement, getDecrement }

export default firebase