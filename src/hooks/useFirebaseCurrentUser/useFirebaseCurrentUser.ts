import React, { Dispatch, SetStateAction } from 'react';
import useFirebase from '../useFirebase';

function useFirebaseCurrentUser() {
  const firebase = useFirebase()
  const [user, setUser]: [firebase.User | null, Dispatch<SetStateAction<firebase.User | null>>] = React.useState<firebase.User | null>(null)

  React.useEffect(() => {
    // onAuthStateChanged returns a firebase.Unscubscribe
    if (firebase) {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        setUser(user)
      })

      return unsubscribe // Unsubscribe for cleanup
    }
  }, [firebase, user])

  return user
}

export default useFirebaseCurrentUser;