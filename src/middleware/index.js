import React from 'react';
import Firebase from "../class";
import FirebaseContext from '../context';

/**
 * 
 * @param {FirebaseConfig} config 
 * @param {FirebaseProduct[]} products 
 */
const provideFirebaseMiddleware = (config, products) => {
  const firebase = new Firebase(config, products)

  const FirebaseProvider = ({ children }) => (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )

  const reduxMiddleware = store => next => action => {
    return next({ ...action, firebase })
  }

  return [FirebaseProvider, reduxMiddleware, firebase]
}

export default provideFirebaseMiddleware
