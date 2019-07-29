import * as React from 'react';
import Firebase from '../../Firebase';
import FirebaseContext from '../../FirebaseContext';

function makeFirebaseProvider(firebase: typeof Firebase) {
  const FirebaseProvider: React.FunctionComponent = ({ children }) => {
    return (
      <FirebaseContext.Provider value={firebase}>
        {children}
      </FirebaseContext.Provider>
    )
  }

  return FirebaseProvider
}

export default makeFirebaseProvider;