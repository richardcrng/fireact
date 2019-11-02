import { Firebase } from "../types";

export const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });


export const firebaseDatabaseVal = async (path: string, firebase: Firebase) => {
  let val
  await firebase.database().ref(path).on('value', dataSnapshot => {
    val = dataSnapshot.val()
  })
  return val
}