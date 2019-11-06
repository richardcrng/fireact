import * as R from 'ramda'
import useFirebase from '../useFirebase';
import { FirebaseDatabaseWriters } from '../../types';

function useFirebaseDatabaseWriters<T = any>(path: string): FirebaseDatabaseWriters<T> {
  const firebase = useFirebase()

  const fallbackHandlers = {
    set: R.identity,
    transaction: R.identity,
    update: R.identity,
    push: R.identity
  }

  const reference = firebase ? firebase.database().ref(path) : fallbackHandlers

  return {
    set: reference.set.bind(reference),
    transaction: reference.transaction.bind(reference),
    update: reference.update.bind(reference),
    push: reference.push.bind(reference)
  }
}

export default useFirebaseDatabaseWriters;