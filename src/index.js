import {
  useFirebaseContext,
  useFirebaseDatabaseValue,
  useFirebaseProvider
} from './hooks';

import provideFirebaseMiddleware from './middleware';

const useFirebase = useFirebaseContext

export {
  provideFirebaseMiddleware as default,
  provideFirebaseMiddleware,
  useFirebase,
  useFirebaseContext,
  useFirebaseDatabaseValue,
  useFirebaseProvider,
}