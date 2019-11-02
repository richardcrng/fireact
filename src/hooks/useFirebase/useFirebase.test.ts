import { renderHook } from '@testing-library/react-hooks'
import { FirebaseConfig, FirebaseProduct } from '../../types';
import Fireact from '../../';
import useFirebase from './useFirebase';

// .env has the config variables in
require('dotenv').config()

describe('GIVEN a config and products of auth and database passed to Firebase', () => {
  const config: FirebaseConfig = {
    apiKey: process.env.API_KEY as string,
    authDomain: process.env.AUTH_DOMAIN as string,
    databaseURL: process.env.DATABASE_URL as string,
    projectId: process.env.PROJECT_ID as string,
    storageBucket: process.env.STORAGE_BUCKET as string,
    messagingSenderId: process.env.MESSAGING_SENDER_ID as string
  }

  const products: FirebaseProduct[] = ['auth', 'database']

  const fireactResult = Fireact(config, products)

  describe('AND firebase and Provider destructured from the fireactResult', () => {
    const { firebase, Provider } = fireactResult

    describe('WHEN Provider is used as a wrapper for useFirebase', () => {
      const { result: { current } } = renderHook(useFirebase, { wrapper: Provider })

      test('THEN the result is equal to the firebase object', () => {
        expect(current).toBe(firebase)
      })
    })
  })
})