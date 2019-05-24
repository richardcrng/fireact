import {
  useFirebaseContext,
} from './hooks';

import provideFirebaseMiddleware from './middleware';
import references from './references';
import writes from './writes';

const useFirebase = useFirebaseContext

export * from './hooks'
export * from './utils'

export {
  provideFirebaseMiddleware as default,
  provideFirebaseMiddleware,
  useFirebase,
  references,
  writes
}