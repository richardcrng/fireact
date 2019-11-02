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

      it('Has the current value of the state as the first element of the return value', async () => {
        const { result } = renderHook(() => useFirebaseDatabaseState(path), { wrapper: Provider })

        await act(async () => {
          await delay(1000)
        })

        expect(result.current[0]).toBe(1)
      })
    })
  })
})
