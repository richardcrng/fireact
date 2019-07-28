import _ from 'lodash';
import * as firebase from 'firebase/app'
import FirebaseConfig from '../types/FirebaseConfig';
import FirebaseProduct from '../types/FirebaseProduct';

const loadFirebaseModule = (product: FirebaseProduct) => {
  switch (product) {
    case 'auth': return require('firebase/auth')
    case 'database': return require('firebase/database')
    case 'firestore': return require('firebase/firestore')
    case 'functions': return require('firebase/functions')
    case 'messaging': return require('firebase/messaging')
    case 'storage': return require('firebase/storage')
  }
}

class Firebase {
  app: typeof firebase.app
  auth: typeof firebase.auth
  database: typeof firebase.database
  firestore: typeof firebase.firestore
  functions: typeof firebase.functions
  messaging: typeof firebase.messaging
  storage: typeof firebase.storage

  constructor(config: FirebaseConfig, products: FirebaseProduct[] = []) {
    products.forEach(loadFirebaseModule)

    // Initialise app if needed
    if (!firebase.apps.length) firebase.initializeApp(config)

    // Construct services
    this.app = firebase.app
    this.auth = firebase.auth
    this.database = firebase.database
    this.firestore = firebase.firestore
    this.functions = firebase.functions
    this.messaging = firebase.messaging
    this.storage = firebase.storage
  }
}

export default Firebase;