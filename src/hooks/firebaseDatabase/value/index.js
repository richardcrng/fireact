import _ from 'lodash';
import * as R from 'ramda'
import React from 'react';
import { useFirebaseContext } from "../../../hooks";

function useFirebaseDatabaseValue(path) {
  const firebase = useFirebaseContext()

  const [value, setValue] = React.useState()

  const updateValueFromSnapshotIfDifferent = React.useCallback(
    (dataSnapshot) => {
      const snapshotValue = dataSnapshot.val()
      if (R.equal(value, snapshotValue)) setValue(snapshotValue)
    },
    [value]
  )

  React.useEffect(() => {
    const reference = firebase.database().ref(path)

    reference.on('value', updateValueFromSnapshotIfDifferent)

    return function cleanup() {
      reference.off('value', updateValueFromSnapshotIfDifferent)
    }
  }, [updateValueFromSnapshotIfDifferent])

  return value
}

export default useFirebaseDatabaseValue;