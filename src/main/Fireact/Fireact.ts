import firebase from 'firebase/app'
import Firebase from '../../types/Firebase/';
import FirebaseConfig from '../../types/Config';
import FirebaseProduct from '../../types/Product';
import makeFirebaseProvider from '../makeFirebaseProvider';
import makeFirebaseMiddleware from '../makeFirebaseMiddleware';

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


function Fireact(config: FirebaseConfig, products: FirebaseProduct[]) {
  products.forEach(loadFirebaseModule)

  // Initialise app if needed
  if (!firebase.apps.length) firebase.initializeApp(config)

  const firebaseInstance: Firebase = {
    app: firebase.app,
    auth: firebase.auth,
    database: firebase.database,
    firestore: firebase.firestore,
    functions: firebase.functions,
    messaging: firebase.messaging,
    storage: firebase.storage
  }


  const Provider = makeFirebaseProvider(firebaseInstance)
  const middleware = makeFirebaseMiddleware(firebaseInstance)

  return { firebase: firebaseInstance, Provider, middleware }
}

export default Fireact;