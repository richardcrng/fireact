import Fireact from './main';
import useFirebase from './hooks';
import useFirebaseCurrentUser from './hooks';
import useFirebaseDatabaseValue from './hooks';

import references from './references';
import writes from './writes';



export * from './utils'

export default Fireact

export {
  // hooks
  useFirebase,
  useFirebaseCurrentUser,
  useFirebaseDatabaseValue,

  // misc
  references,
  writes
}