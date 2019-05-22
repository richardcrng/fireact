import _ from 'lodash';
import React from 'react';
import { useFirebaseContext } from "../..";

function useFirebaseDatabaseValue(path) {
  const firebase = useFirebaseContext()
  const [value, setValue] = React.useState()

  const updateValueFromSnapshotIfDifferent = React.useCallback(
    (dataSnapshot) => {
      const snapshotValue = dataSnapshot.value()
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
}

export default useFirebaseDatabaseValue;