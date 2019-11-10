import * as R from 'ramda'
import useFirebase from '../useFirebase';
import { FirebaseDatabaseWriters } from '../../types';

function useFirebaseDatabaseWriters<T = any>(path: string): FirebaseDatabaseWriters<T> {
  const firebase = useFirebase()

  if (!firebase) return {
    set: R.identity,
    transaction: R.identity,
    update: R.identity,
    push: R.identity,
    pushWithKey: (callback: (key: string | null) => any) => undefined
  }

  const reference = firebase.database().ref(path)

  const pushWithKey = (callback: ((key: string | null) => any)) => {
    if (!firebase) return
    const newReference = reference.push()
    const newKey = newReference.key
    const valToPush = callback(newKey)
    return newReference.set(valToPush)
  }

  return {
    set: reference.set.bind(reference),
    transaction: reference.transaction.bind(reference),
    update: reference.update.bind(reference),
    push: reference.push.bind(reference),
    pushWithKey
  }
}

export default useFirebaseDatabaseWriters;