import { renderHook, act } from '@testing-library/react-hooks'
import { FirebaseConfig, FirebaseProduct } from '../../types';
import Fireact from '../../';
import useFirebaseDatabaseValue from './useFirebaseDatabaseValue';
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

describe('GIVEN a config and products of auth and database passed to Firebase', () => {
  const fireactResult = Fireact(config, products)

  describe('AND Provider is destructured from the fireactResult', () => {
    const { Provider } = fireactResult

    describe("WHEN path is 'useFirebaseDatabaseValue/boolean", () => {
      const path = 'useFirebaseDatabaseValue/boolean' // identifier for something in the database

      describe('AND Provider is used as a wrapper for useFirebaseDatabaseValue at this path', () => {
        const { result } = renderHook(() => useFirebaseDatabaseValue(path), { wrapper: Provider })

        it('THEN, after a short wait, the current value is true', async () => {  
          // A delay needed as value syncs up with Firebase realtime database
          await act(async () => {
            await delay(1000)
          })
          expect(result.current).toBe(true)
        })
      })
    })

    describe("WHEN path is 'useFirebaseDatabaseValue/counter", () => {
      const path = 'useFirebaseDatabaseValue/counter' // identifier for something in the database

      describe('AND Provider is used as a wrapper for useFirebaseDatabaseValue at this path', () => {
        const { result } = renderHook(() => useFirebaseDatabaseValue(path), { wrapper: Provider })

        it('THEN, after a short wait, the current value is 1', async () => {
          // A delay needed as value syncs up with Firebase realtime database
          await act(async () => {
            await delay(1000)
          })
          expect(result.current).toBe(1)
        })
      })
    })

    describe("WHEN path is 'useFirebaseDatabaseValue/nested", () => {
      const path = 'useFirebaseDatabaseValue/nested' // identifier for something in the database

      describe('AND Provider is used as a wrapper for useFirebaseDatabaseValue at this path', () => {
        const { result } = renderHook(() => useFirebaseDatabaseValue(path), { wrapper: Provider })

        it('THEN, after a short wait, the current value is an object', async () => {
          // A delay needed as value syncs up with Firebase realtime database
          await act(async () => {
            await delay(1000)
          })
          expect(result.current).toEqual({ deep: false, string: 'foobar' })
        })
      })
    })
  })
})