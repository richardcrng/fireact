import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/storage';
import 'firebase/messaging'

class Firebase {
  /**
   * 
   * @param {FirebaseConfig} config - Firebase Configuration options
   */
  constructor({ apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId }) {
    if (!firebase.apps.length) firebase.initializeApp({
      authDomain,
      apiKey,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId
    });

    // Construct services
    this.app = firebase.app()
    this.auth = executeAndSpread(firebase.auth)
    this.database = executeAndSpread(firebase.database)
    this.firestore = executeAndSpread(firebase.firestore)
    this.functions = executeAndSpread(firebase.functions)
    this.messaging = executeAndSpread(firebase.messaging)
    // this.performance = firebase.performance()
    this.storage = executeAndSpread(firebase.storage)
  }
}

const executeAndSpread = firebaseModule => ({
  ...firebaseModule,
  ...firebaseModule()
})

export default Firebase;