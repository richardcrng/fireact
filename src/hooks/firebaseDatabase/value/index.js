import _ from 'lodash';
import React from 'react';
import { useFirebaseContext } from "../../../hooks";

function useFirebaseDatabaseValue(path) {
  const firebase = useFirebaseContext()

  const [value, setValue] = React.useState()

  const updateValueFromSnapshotIfDifferent = React.useCallback(
    (dataSnapshot) => {
      const snapshotValue = dataSnapshot.val()
      if (!_.isEqual(snapshotValue, value)) setValue(snapshotValue)
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