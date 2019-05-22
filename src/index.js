import {
  useFirebaseContext,
  useFirebaseDatabaseValue,
  useFirebaseProvider
} from './hooks';

import createFirebaseMiddleware from './middleware';

const useFirebase = useFirebaseContext

export {
  useFirebase as default,
  useFirebase,
  useFirebaseContext,
  useFirebaseDatabaseValue,
  useFirebaseProvider,
  createFirebaseMiddleware
}