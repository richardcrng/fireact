import Firebase from '../../Firebase';
import makeFirebaseProvider from '../makeFirebaseProvider';
import makeFirebaseMiddleware from '../makeFirebaseMiddleware';

/**
 *
 * @param {FirebaseConfig} config
 * @param {FirebaseProduct[]} products
 */
function Fireact(config, products) {
  const firebase = new Firebase(config, products)

  const Provider = makeFirebaseProvider(firebase)
  const middleware = makeFirebaseMiddleware(firebase)

  return { firebase, Provider, middleware }
}

export default Fireact;