import React from 'react';
import FirebaseContext from '../context';

function useFirebase() {
  return React.useContext(FirebaseContext)
}

export default useFirebase;