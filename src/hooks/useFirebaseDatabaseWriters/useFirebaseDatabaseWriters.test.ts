import { renderHook, act } from '@testing-library/react-hooks'
import { FirebaseConfig, FirebaseProduct } from '../../types';
import Fireact from '../../';
import useFirebaseDatabaseWriters from './useFirebaseDatabaseWriters';
import { delay, refreshTestValFromFirebase, getTestVal } from '../testUtils';

// .env has the config variables in
require('dotenv').config()

const config: FirebaseConfig = {
  apiKey: process.env.API_KEY as string,
  authDomain: process.env.AUTH_DOMAIN as string,
  databaseURL: process.env.DATABASE_URL as string,
  projectId: process.env.PROJECT_ID as string,
  storageBucket: process.env.STORAGE_BUCKET as string,
  messagingSenderId: process.env.MESSAGING_SENDER_ID as string
}

const products: FirebaseProduct[] = ['auth', 'database']

describe('set handler updates value', () => {
  describe('GIVEN a config and products of auth and database passed to Firebase', () => {
    const fireactResult = Fireact(config, products)

    describe('AND Provider is destructured from the fireactResult', () => {
      const { firebase, Provider } = fireactResult

      describe("WHEN path is 'useFirebaseDatabaseWriters/boolean", () => {
        const path = 'useFirebaseDatabaseWriters/boolean' // identifier for something in the database

        describe('AND Provider is used as a wrapper for useFirebaseDatabaseWriters at this path', () => {
          afterAll(() => {
            firebase.database().ref(path).set(true)
          })
          const { result } = renderHook(() => useFirebaseDatabaseWriters(path), { wrapper: Provider })

          it('THEN, when the set handler is passed a value of false, it updates the database value at the path to false', async () => {
            await refreshTestValFromFirebase(path, firebase)
            await delay(1000)
            expect(getTestVal()).toBe(true)

            await result.current.set(false)
            await refreshTestValFromFirebase(path, firebase)
            await delay(1000)
            expect(getTestVal()).toBe(false)
          })
        })
      })
    })
  })
})
