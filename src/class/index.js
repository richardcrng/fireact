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
    this.auth = firebase.auth()
    this.database = firebase.database()
    this.firestore = firebase.firestore()
    this.functions = firebase.functions()
    this.messaging = firebase.messaging()
    this.performance = firebase.performance()
    this.storage = firebase.storage()
  }
}

export default Firebase;