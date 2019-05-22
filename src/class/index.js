import _ from 'lodash';
import * as firebase from 'firebase/app'

class Firebase {
  /**
   * 
   * @param {FirebaseConfig} config - Firebase Configuration options
   * @param {FirebaseProduct[]} products - Firebase Products to initialise
   */
  constructor(config, products = []) {
    // Initialise app if needed
    if (!firebase.apps.length) firebase.initializeApp(config)

    // Construct services
    this.app = firebase.app

    products.forEach(
      moduleName => {
        // Require the specific product
        const firebaseProduct = firebase[moduleName]
        this[moduleName] = firebaseProduct
        
        // Initialise as capitalised if appropriate
        if (typeof firebaseProduct === "function") {
          this[_.capitalize(moduleName)] = firebaseProduct()
        }
      }
    )
  }
}

export default Firebase;