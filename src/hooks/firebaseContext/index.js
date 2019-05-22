import React from 'react';
import FirebaseContext from '../../context';

function useFirebaseContext() {
  return React.useContext(FirebaseContext)
}

export default useFirebaseContext;