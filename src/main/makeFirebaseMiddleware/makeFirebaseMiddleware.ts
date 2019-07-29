import Firebase from "../../types/Firebase";

function makeFirebaseMiddleware(firebase: Firebase) {
  return (store: object) => (next: Function) => (action: object) => {
    return next({ ...action, firebase })
  }
}

export default makeFirebaseMiddleware