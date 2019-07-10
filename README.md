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

## Hooks

### `useFirebase()`
#### Returns
The `firebase` object initialised by Fireact.

#### Example
```js
import React from 'react'
import { useFirebase } from 'fireact'

function Component() {
  const firebase = useFirebase()

  // other stuff
}
```

### `useFirebaseCurrentUser()`
#### Retrns
The current user from Firebase Authentication, if there is one.

#### Example
```js
import React from 'react'
import { useFirebaseCurrentUser } from 'fireact'

function Component() {
  const user = useFirebaseCurrentUser()

  // other stuff
}
```

### `useFirebaseDatabaseValue(path, [options = {}])`
#### Retrns
The current value of the Firebase Real-Time Database at `path`.

#### Example
```js
import React from 'react'
import { useFirebaseDatabaseValue } from 'fireact'

function Component() {
  const entry = useFirebaseDatabaseValue('arbitrary/path/to/entry')

  // other stuff
}
```