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
    const { firebase, Provider } = Fireact(config, products)

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

describe('transaction handler uses an update function', () => {
  describe('GIVEN a config and products of auth and database passed to Firebase', () => {
    const { firebase, Provider } = Fireact(config, products)

    describe("WHEN path is 'useFirebaseDatabaseWriters/counter", () => {
      const path = 'useFirebaseDatabaseWriters/counter' // identifier for something in the database

      describe('AND Provider is used as a wrapper for useFirebaseDatabaseWriters at this path', () => {
        afterAll(() => {
          firebase.database().ref(path).set(1)
        })
        const { result } = renderHook(() => useFirebaseDatabaseWriters(path), { wrapper: Provider })

        it('THEN, when the transaction handler is passed an increment function, it updates the database value by increasing by 1', async () => {
          await refreshTestValFromFirebase(path, firebase)
          await delay(1000)
          expect(getTestVal()).toBe(1)

          await result.current.transaction((prevCount: number) => prevCount + 1)
          await refreshTestValFromFirebase(path, firebase)
          await delay(1000)
          expect(getTestVal()).toBe(2)
        })
      })
    })
  })
})

describe('update handler assigns properties', () => {
  describe('GIVEN a config and products of auth and database passed to Firebase', () => {
    const { firebase, Provider } = Fireact(config, products)

    describe("WHEN path is 'useFirebaseDatabaseWriters/props", () => {
      const path = 'useFirebaseDatabaseWriters/props' // identifier for something in the database

      describe('AND Provider is used as a wrapper for useFirebaseDatabaseWriters at this path', () => {
        afterAll(() => {
          firebase.database().ref(path).update({ nested: true, string: 'foobar' })
        })
        const { result } = renderHook(() => useFirebaseDatabaseWriters(path), { wrapper: Provider })

        it('THEN, when the update handler is passed an object, it assigns those properties at the location', async () => {
          await refreshTestValFromFirebase(path, firebase)
          await delay(1000)
          expect(getTestVal()).toEqual({ nested: true, string: 'foobar' })

          await result.current.update({ string: 'FOO BAR' })
          await refreshTestValFromFirebase(path, firebase)
          await delay(1000)
          expect(getTestVal()).toEqual({ nested: true, string: 'FOO BAR' })
        })
      })
    })
  })
})

describe('push handler creates a new property with given value', () => {
  describe('GIVEN a config and products of auth and database passed to Firebase', () => {
    const { firebase, Provider } = Fireact(config, products)

    describe("WHEN path is 'useFirebaseDatabaseWriters/arrayLike", () => {
      const path = 'useFirebaseDatabaseWriters/arrayLike' // identifier for something in the database

      describe('AND Provider is used as a wrapper for useFirebaseDatabaseWriters at this path', () => {
        afterAll(() => {
          firebase.database().ref(path).set(null)
        })
        const { result } = renderHook(() => useFirebaseDatabaseWriters(path), { wrapper: Provider })

        it('THEN, when the push handler is passed an object, it assigns those properties at the location', async () => {
          await refreshTestValFromFirebase(path, firebase)
          await delay(1000)
          expect(getTestVal()).toBeNull()

          await result.current.push('my thing')
          await refreshTestValFromFirebase(path, firebase)
          await delay(1000)
          expect(Object.values(getTestVal())).toContain('my thing')
        })
      })
    })
  })
})