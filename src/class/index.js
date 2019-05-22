import _ from 'lodash';
import firebase from 'firebase'

class Firebase {
  /**
   * 
   * @param {FirebaseConfig} config - Firebase Configuration options
   * @param {FirebaseProduct[]} products - Firebase Products to initialise
   */
  constructor(config, products) {
    // Initialise app if needed
    if (!firebase.apps.length) firebase.initializeApp(config)

    // Construct services
    this.app = firebase.app

    _.forEach(
      products,
      moduleName => {
        // Require the specific product
        this[moduleName] = firebase[moduleName]

        if (typeof firebase[moduleName] === "function") {
          // Capitalised: interface initialised
          this[_.capitalize(moduleName)] = firebase[moduleName]()
        }
      }
    )
  }
}

export default Firebase;