import React from 'react';
import useFirebaseProvider from '../provider/index';

function provideFirebase(config, Component) {
  const FirebaseProvider = useFirebaseProvider(config)

  return (
    <FirebaseProvider>
      <Component />
    </FirebaseProvider>
  )
}

export default provideFirebase;