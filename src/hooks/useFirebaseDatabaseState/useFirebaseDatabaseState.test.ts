import { renderHook, act } from '@testing-library/react-hooks'
import { FirebaseConfig, FirebaseProduct } from '../../types';
import Fireact from '../..';
import useFirebaseDatabaseState from './useFirebaseDatabaseState';
import { delay } from '../testUtils';

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

describe('Retrieving a value from a database', () => {
  describe('GIVEN a config and products of auth and database passed to Firebase', () => {
    const { firebase, Provider } = Fireact(config, products)

    describe("WHEN path is 'useFirebaseDatabaseState/counter", () => {
      const path = 'useFirebaseDatabaseState/counter' // identifier for something in the database

      afterAll(() => {
        firebase.database().ref(path).set(1)
      })

      it('Has the current value of the state as the zeroth element of the return value', async () => {
        const { result } = renderHook(() => useFirebaseDatabaseState(path), { wrapper: Provider })

        await act(async () => {
          await delay(1000)
        })

        expect(result.current[0]).toBe(1)
      })

      it('Can update state through the set property of the first element', async () => {
        const { result } = renderHook(() => useFirebaseDatabaseState(path), { wrapper: Provider })

        await act(async () => {
          await result.current[1].set(2)
          await delay(1000)
        })

        expect(result.current[0]).toBe(2)
      })

      it('Can update state through the transaction property of the first element', async () => {
        const { result } = renderHook(() => useFirebaseDatabaseState(path), { wrapper: Provider })

        await act(async () => {
          await result.current[1].transaction((num: number) => num + 1)
          await delay(1000)
        })

        expect(result.current[0]).toBe(3)
      })
    })

    describe("WHEN path is 'useFirebaseDatabaseState/nested", () => {
      const path = 'useFirebaseDatabaseState/nested' // identifier for something in the database

      afterAll(() => {
        firebase.database().ref(path).set({ boolean: false, string: 'foobar' })
      })

      it('Has the current value of the state as the zeroth element of the return value', async () => {
        const { result } = renderHook(() => useFirebaseDatabaseState(path), { wrapper: Provider })

        await act(async () => {
          await delay(1000)
        })

        expect(result.current[0]).toEqual({ boolean: false, string: 'foobar' })
      })

      it('Can update state through the update property of the first element', async () => {
        const { result } = renderHook(() => useFirebaseDatabaseState(path), { wrapper: Provider })

        await act(async () => {
          await result.current[1].update({ string: 'FOO BAR' })
          await delay(1000)
        })

        expect(result.current[0]).toEqual({ boolean: false, string: 'FOO BAR' })
      })
    })
  })
})
