import Fireact from './main';
import { useFirebase } from './hooks';
import { useFirebaseCurrentUser } from './hooks';
import { useFirebaseDatabaseValue } from './hooks';

import references from './references';
import writes from './writes';
import { generatePushID } from './utils';

export default Fireact

export {
  generatePushID,

  // hooks
  useFirebase,
  useFirebaseCurrentUser,
  useFirebaseDatabaseValue,

  // misc
  references,
  writes
}