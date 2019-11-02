import { renderHook, act } from '@testing-library/react-hooks'
import { FirebaseConfig, FirebaseProduct } from '../../types';
import Fireact from '../../';
import useFirebaseCurrentUser from './useFirebaseCurrentUser';
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
    const { firebase, Provider } = fireactResult

    describe('WHEN Provider is used as a wrapper for useFirebaseCurrentUser at this path', () => {
      const { result } = renderHook(useFirebaseCurrentUser, { wrapper: Provider })

      it('THEN, after a short wait, if there is a logged in user then the current value is an object with the right uid property', async () => {
        // A delay needed as value syncs up with Firebase realtime database
        await act(async () => {
          await firebase.auth().signInWithEmailAndPassword('test@fireact.com', 'password123')
          await delay(1000)
        })
        expect(result.current.uid).toBe('cZBs9SAHbqXGVbdbPEdVqM9jY3b2')
      })
    })
  })
})