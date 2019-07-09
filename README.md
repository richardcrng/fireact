# Fireact

## Installation
```bash
npm install --s fireact
```

## Main API
```js
import Fireact from 'fireact'

// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com
const config = {
  apiKey: "AIza....",                             // Auth / General Use
  authDomain: "YOUR_APP.firebaseapp.com",         // Auth with popup/redirect
  databaseURL: "https://YOUR_APP.firebaseio.com", // Realtime Database
  storageBucket: "YOUR_APP.appspot.com",          // Storage
  messagingSenderId: "123456789"                  // Cloud Messaging
}

const products = [
  'auth',
  'database'
  // ...include any other Firebase products you want to use
]

const {
  firebase,     // firebase object with API as documented: https://firebase.google.com/docs/reference/js/
  Provider,     // Parent Provider that allows Fireact hooks to be used in components nested within
  middleware    // Redux middleware that makes the firebase object available as a property of all actions
} = Fireact(config, products)
```

