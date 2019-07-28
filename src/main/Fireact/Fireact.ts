import Firebase from '../../Firebase';
import makeFirebaseProvider from '../makeFirebaseProvider';
import makeFirebaseMiddleware from '../makeFirebaseMiddleware';
import FirebaseConfig from '../../types/FirebaseConfig';
import FirebaseProduct from '../../types/FirebaseProduct';

function Fireact(config: FirebaseConfig, products: FirebaseProduct[]) {
  const firebase = new Firebase(config, products)

  const Provider = makeFirebaseProvider(firebase)
  const middleware = makeFirebaseMiddleware(firebase)

  return { firebase, Provider, middleware }
}

export default Fireact;