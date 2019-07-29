import firebase from 'firebase/app'

interface Firebase {
  app: typeof firebase.app
  auth: typeof firebase.auth
  database: typeof firebase.database
  firestore: typeof firebase.firestore
  functions: typeof firebase.functions
  messaging: typeof firebase.messaging
  storage: typeof firebase.storage
}

export default Firebase