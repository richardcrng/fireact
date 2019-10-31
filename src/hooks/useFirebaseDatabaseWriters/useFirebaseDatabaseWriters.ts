import * as R from 'ramda'
import useFirebase from '../useFirebase';

function useFirebaseDatabaseWriters(path: string) {
  const firebase = useFirebase()

  const fallbackHandlers = {
    set: R.identity,
    transaction: R.identity,
    update: R.identity
  }

  const reference = firebase ? firebase.database().ref(path) : fallbackHandlers

  return {
    set: reference.set,
    transaction: reference.transaction,
    update: reference.update
  }
}

export default useFirebaseDatabaseWriters;