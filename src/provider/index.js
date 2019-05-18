import React from 'react';
import Firebase from '../class';
import FirebaseContext from '../context';

/**
 * Creates a Firebase Provider
 * 
 * @param {FirebaseConfig} config 
 */
function useFirebaseProvider(config) {
  const [firebase] = React.useState(new Firebase(config))

  return function FirebaseProvider({ children }) {
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }
}

export default useFirebaseProvider;