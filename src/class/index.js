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

    this.app = firebase
  }
}

export default Firebase;