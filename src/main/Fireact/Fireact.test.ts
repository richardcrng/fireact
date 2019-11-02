import { FirebaseConfig, FirebaseProduct } from "../../types"
import Fireact from "./Fireact"

// .env has the config variables in
require('dotenv').config()

describe('GIVEN the config for a project', () => {
  const config: FirebaseConfig = {
    apiKey: process.env.API_KEY as string,
    authDomain: process.env.AUTH_DOMAIN as string,
    databaseURL: process.env.DATABASE_URL as string,
    projectId: process.env.PROJECT_ID as string,
    storageBucket: process.env.STORAGE_BUCKET as string,
    messagingSenderId: process.env.MESSAGING_SENDER_ID as string
  }

  describe('AND products to be loaded of auth and database', () => {
    const products: FirebaseProduct[] = ['auth', 'database']

    describe('WHEN Fireact is called with config and products', () => {
      const result = Fireact(config, products)

      it('THEN the result is an object', () => {
        expect(typeof result).toBe('object')
      })
    })
  })
})