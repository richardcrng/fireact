import Firebase from '../../Firebase';
import makeFirebaseMiddleware from '../makeFirebaseMiddleware';
import makeFirebaseProvider from '../makeFirebaseProvider';

/**
 * 
 * @param {FirebaseConfig} config 
 * @param {FirebaseProduct[]} products 
 */
const provideFirebaseMiddleware = (config, products) => {
  const firebase = new Firebase(config, products)

  const FirebaseProvider = makeFirebaseProvider(firebase)
  const firebaseMiddleware = makeFirebaseMiddleware(firebase)

  return [FirebaseProvider, firebaseMiddleware, firebase]
}

export default provideFirebaseMiddleware
