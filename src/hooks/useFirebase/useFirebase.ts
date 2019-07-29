import React from 'react';
import FirebaseContext from '../../FirebaseContext';
import Firebase from '../../types/Firebase';

function useFirebase(): Firebase | null {
  return React.useContext(FirebaseContext)
}

export default useFirebase;