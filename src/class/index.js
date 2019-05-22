import _ from 'lodash';
// Core Firebase SDK (Firebase App)
import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/functions'
// import 'firebase/storage';
// import 'firebase/messaging'

class Firebase {
  /**
   * 
   * @param {FirebaseConfig} config - Firebase Configuration options
   * @param {FirebaseProduct[]} products - Firebase Products to initialise
   */
  constructor(config, products) {
    // Require specific products
    _.forEach(
      products,
      product => require(`firebase/${product}`)
    )

    // Initialise app if needed
    if (!firebase.apps.length) firebase.initializeApp(config)

    // Construct services
    this.app = firebase.app()

    _.forEach(
      products,
      moduleName => {
        // Require the specific product
        this[moduleName] = require(`firebase/${product}`)
        // this[_.capitalize(moduleName)] = firebase[moduleName]()
      }
    )
  }
}

export default Firebase;