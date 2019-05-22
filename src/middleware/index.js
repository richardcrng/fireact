import React from 'react';
import Firebase from "../class";
import FirebaseContext from '../context';

/**
 * 
 * @param {FirebaseConfig} config 
 * @param {FirebaseProduct[]} products 
 */
const firebaseProviderAndMiddleware = (config, products) => {
  const firebase = new Firebase(config, products)

  const provider = ({ children }) => (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )

  const middleware = store => next => action => {
    return next({ ...action, firebase })
  }

  return [provider, middleware, firebase]
}

export default firebaseProviderAndMiddleware
