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

const firebaseModules: FirebaseProduct[] = ['auth', 'database', 'firestore', 'functions', 'messaging', 'storage']

class Firebase {
  app: Function
  auth?: Function
  database?: Function
  firestore?: Function
  functions?: Function
  messaging?: Function
  storage?: Function

  /**
   * 
   * @param {FirebaseConfig} config - Firebase Configuration options
   * @param {FirebaseProduct[]} products - Firebase Products to initialise
   */
  constructor(config: FirebaseConfig, products: FirebaseProduct[] = []) {
    products.forEach(loadFirebaseModule)

    // Initialise app if needed
    if (!firebase.apps.length) firebase.initializeApp(config)

    // Construct services
    this.app = firebase.app

    for (let moduleName of firebaseModules) {
      if (products.includes(moduleName)) {
        this[moduleName] = firebase[moduleName]
      }
    }
  }
}

export default Firebase;