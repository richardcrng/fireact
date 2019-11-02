import { Firebase } from "../types";

export const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

let firebaseTestVariable: any

export const getTestVal = () => firebaseTestVariable 

export const refreshTestValFromFirebase = async (path: string, firebase: Firebase) => {
  await firebase.database().ref(path).on('value', dataSnapshot => {
    firebaseTestVariable = dataSnapshot.val()
  })
}