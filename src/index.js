import {
  useFirebaseContext,
  useFirebaseDatabaseValue,
  useFirebaseProvider
} from './hooks';

import firebaseProviderAndMiddleware from './middleware';

const useFirebase = useFirebaseContext

export {
  useFirebase as default,
  useFirebase,
  useFirebaseContext,
  useFirebaseDatabaseValue,
  useFirebaseProvider,
  firebaseProviderAndMiddleware
}