import {
  useFirebaseContext,
} from './hooks';

import provideFirebaseMiddleware from './middleware';

const useFirebase = useFirebaseContext

export * from './hooks'
export * from './utils'

export {
  provideFirebaseMiddleware as default,
  provideFirebaseMiddleware,
  useFirebase,
}