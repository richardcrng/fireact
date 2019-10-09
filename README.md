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
Hooks can be used inside any component that has `Provider` wrapped around it.

### `useFirebase()`
#### Returns
The `firebase` object initialised by Fireact.

#### Example
```js
import React from 'react'
import { useFirebase } from 'fireact'

function Component() {
  const firebase = useFirebase()

  // exposes the JS Firebase API
  // docs at https://firebase.google.com/docs/reference/js/
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

  // exposes the firebase.User object for the current Firebase user
  // docs at https://firebase.google.com/docs/reference/js/firebase.User.html
}
```

### `useFirebaseDatabaseValue(path, [options = {}])`
#### Parameters
* `path` *(string)*: path to a value in the Firebase Real-Time Database
* `options` *(object, optional)*: a configuration object for sorting and filtering

#### Returns
The current value of the Firebase Real-Time Database at `path`.

#### Example
```js
import React from 'react'
import { useFirebaseDatabaseValue } from 'fireact'

function Component() {
  const entry = useFirebaseDatabaseValue('arbitrary/path/to/entry')

  // exposes the JS value from the Firebase RTD database location of path
}
```

#### `options` object: sorting and filtering
| Key | Value (type) | Description | Firebase Docs |
| --- | --- | --- |
| `orderByChild` | string | Uses the given value as a child key to order the data | [`firebase.database.Reference.orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-bychild) |
| `orderByKey` | boolean | If true, orders the data by key | [`firebase.database.Reference.orderByKey`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-bykey) |
| `orderByPriority` | boolean | If true, orders the data by priority | [`firebase.database.Reference.orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-bypriority) |
| `orderByValue` | boolean | If true, orders the data by value | [`firebase.database.Reference.orderByValue`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-byvalue) |