import * as React from 'react';
import Firebase from '../../Firebase';
import FirebaseContext from '../../FirebaseContext';

function makeFirebaseProvider(firebase: typeof Firebase) {
  return function FirebaseProvider({ children }) {
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }
}

export default makeFirebaseProvider;