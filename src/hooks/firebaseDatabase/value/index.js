import _ from 'lodash';
import React from 'react';
import { useFirebaseContext } from "../../../hooks";
import useStateHandlers from '../../stateHandlers';

function useFirebaseDatabaseValue(path, {
  orderByChild,     // string
  orderByKey,       // boolean
  orderByValue,     // boolean
  orderByPriority   // boolean
} = {}) {
  const firebase = useFirebaseContext()

  const [value, { set: setValue }] = useStateHandlers()

  const setValueFromSnapshot = React.useCallback(
    dataSnapshot => setValue(dataSnapshot.val()),
    [setValue]
  )

  React.useEffect(() => {
    let reference = firebase.database().ref(path)

    if (orderByChild) {
      reference = reference.orderByChild(orderByChild)
    } else if (orderByKey) {
      reference = reference.orderByKey()
    } else if (orderByValue) {
      reference = reference.orderByValue()
    } else if (orderByPriority) {
      reference = reference.orderByPriority()
    }

    reference.on('value', (setValueFromSnapshot))

    return function cleanup() {
      reference.off('value', setValueFromSnapshot)
    }
  }, [setValue])

  return value
}

export default useFirebaseDatabaseValue;