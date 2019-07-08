import React from 'react';
import FirebaseContext from '../../FirebaseContext';

function makeFirebaseProvider(firebase) {
  return function FirebaseProvider({ children }) {
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }
}

export default makeFirebaseProvider;