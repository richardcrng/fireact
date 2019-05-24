import _ from 'lodash';
import * as R from 'ramda'
import React from 'react';
import { useFirebaseContext } from "../../../hooks";
import useStateHandlers from '../../stateHandlers';

function useFirebaseDatabaseValue(path) {
  const firebase = useFirebaseContext()

  const [value, { set: setValue }] = useStateHandlers()

  const setValueFromSnapshot = React.useCallback(
    dataSnapshot => setValue(dataSnapshot.val()),
    [setValue]
  )

  React.useEffect(() => {
    const reference = firebase.database().ref(path)

    reference.on('value', (setValueFromSnapshot))

    return function cleanup() {
      reference.off('value', setValueFromSnapshot)
    }
  }, [setValue])

  return value
}

export default useFirebaseDatabaseValue;