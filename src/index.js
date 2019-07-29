import Fireact from './main';
import { useFirebase } from './hooks';
import { useFirebaseCurrentUser } from './hooks';
import { useFirebaseDatabaseValue } from './hooks';

import references from './references';
import writes from './writes';
import { generatePushID } from './utils';

Fireact.generatePushID = generatePushID
Fireact.useFirebase = useFirebase
Fireact.useFirebaseCurrentUser = useFirebaseCurrentUser
Fireact.useFirebaseDatabaseValue = useFirebaseDatabaseValue

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