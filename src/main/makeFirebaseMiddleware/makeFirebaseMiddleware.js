function makeFirebaseMiddleware(firebase) {
  return store => next => action => {
    return next({ ...action, firebase })
  }
}

export default makeFirebaseMiddleware