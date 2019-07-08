import React from 'react';
import FirebaseContext from '../../FirebaseContext';

function useFirebaseContext() {
  return React.useContext(FirebaseContext)
}

export default useFirebaseContext;