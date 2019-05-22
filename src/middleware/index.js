import Firebase from "../class";

const createFirebaseMiddleware = (config, products) => {
  const firebase = new Firebase(config, products)

  return store => next => action => {
    return next({ ...action, firebase })
  }
}

export default createFirebaseMiddleware
