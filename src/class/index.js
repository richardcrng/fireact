import _ from 'lodash';
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

    _.forEach(
      ['auth', 'database', 'firestore', 'functions', 'messaging', 'storage'],
      moduleName => {
        this[moduleName] = firebase[moduleName]
        this[_.capitalize(moduleName)] = firebase[moduleName]()
      }
    )
  }
}

export default Firebase;