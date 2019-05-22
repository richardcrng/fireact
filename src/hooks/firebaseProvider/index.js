import React from 'react';
import FirebaseContext from '../../context';
import Firebase from '../../class';

/**
 * Creates a Firebase Provider
 * 
 * @param {FirebaseConfig} config - Configuration options for Firebase
 * @param {FirebaseProduct[]} products - Array of Firebase Products to initialise
 */
function useFirebaseProvider(config, products) {
  const [firebase] = React.useState(new Firebase(config, products))

  function FirebaseProvider({ children }) {
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }

  return React.useCallback(FirebaseProvider, [firebase])
}

export default useFirebaseProvider;