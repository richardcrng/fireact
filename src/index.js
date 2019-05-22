import {
  useFirebaseContext,
} from './hooks';

import provideFirebaseMiddleware from './middleware';

const useFirebase = useFirebaseContext

export * from './hooks'

export {
  provideFirebaseMiddleware as default,
  provideFirebaseMiddleware,
  useFirebase,
}