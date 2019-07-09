import React from 'react';
import { useFirebase } from '../useFirebase';

function useFirebaseCurrentUser() {
  const firebase = useFirebase
  const [user, setUser] = React.useState(firebase.auth().currentUser)

  React.useEffect(() => {
    // onAuthStateChanged returns a firebase.Unscubscribe
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })

    return unsubscribe // Unsubscribe for cleanup
  }, [user])

  return user
}

export default useFirebaseCurrentUser;