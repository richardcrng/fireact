import React from 'react';
import Firebase from '../class';
import FirebaseContext from '../context';

/**
 * Creates a Firebase Provider
 * 
 * @param {FirebaseConfig} config 
 */
function useFirebaseProvider(config) {
  const [firebase] = React.useState(new Firebase(config).app)

  const FirebaseProvider = React.useCallback(({ children }) => {
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }, [firebase])

  return FirebaseProvider
}

export default useFirebaseProvider;