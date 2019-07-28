import _ from 'lodash';
import * as firebase from 'firebase/app'
import FirebaseConfig from '../../types/FirebaseConfig';
import FirebaseProduct from '../../types/FirebaseProduct';

function loadFirebase(config: FirebaseConfig, products: FirebaseProduct[] = []) {
  products.forEach(loadFirebaseModule)

  // Initialise app if needed
  if (!firebase.apps.length) firebase.initializeApp(config)

  return firebase
}

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

export default loadFirebase;