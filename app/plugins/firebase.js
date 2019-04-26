import firebase from 'firebase'
import 'firebase/firestore'

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

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()

const storage = firebase.storage();

export { db, getTimestamp, storage }

export default firebase