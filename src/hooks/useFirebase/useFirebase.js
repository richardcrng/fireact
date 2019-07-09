import React from 'react';
import FirebaseContext from '../../FirebaseContext';

function useFirebase() {
  return React.useContext(FirebaseContext)
}

export default useFirebase;