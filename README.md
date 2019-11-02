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
#### Returns
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
  const value = useFirebaseDatabaseValue('arbitrary/path/to/value')

  // exposes the JS value from the Firebase RTD database location of path
}
```

#### `options` object: sorting and filtering
| Key | Value (type) | Description | Firebase Docs |
| --- | --- | --- | --- |
| `orderByChild` | string | Uses the given value as a child key to order the data | [`firebase.database.Reference.orderByChild`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-bychild) |
| `orderByKey` | boolean | If true, orders the data by key | [`firebase.database.Reference.orderByKey`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-bykey) |
| `orderByPriority` | boolean | If true, orders the data by priority | [`firebase.database.Reference.orderByPriority`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-bypriority) |
| `orderByValue` | boolean | If true, orders the data by value | [`firebase.database.Reference.orderByValue`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#order-byvalue) |
| `limitToFirst` | number | Retrieves only the first `limitToFirst` number of children | [`firebase.database.Reference.limitToFirst`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#limit-tofirst) |
| `limitToLast` | number | Retrieves only the last `limitToLast` number of children | [`firebase.database.Reference.limitToLast`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#limit-tolast) |
| `startAt` | number, string or boolean |  | [`firebase.database.Reference.startAt`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#start-at) |
| `endAt` | number, string or boolean |  | [`firebase.database.Reference.endAt`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#end-at) |
| `equalTo` | number, string or boolean |  | [`firebase.database.Reference.equalTo`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#equal-to) |

### `useFirebaseDatabaseWriters(path)`
#### Parameters
* `path` *(string)*: path to a value in the Firebase Real-Time Database

#### Returns
An object of functions which can be used to write to Firebase Real-Time Database at `path`:
| Function | Description | Firebase Docs |
| --- | --- | --- |
| `set` | Takes a value and updates the RTD to the given value at `path` | [`firebase.database.Reference.set`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#set) |
| `transaction` | Takes a callback and updates the RTD with the return value from the callback when it is passed the RTD's current value at `path` | [`firebase.database.Reference.transaction`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#transaction) |
| `update` | Takes an object and updates the RTD by assigning the object's key-value pairs at `path` | [`firebase.database.Reference.update`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#update) |

#### Example
```js
import React from 'react'
import { useFirebaseDatabaseWriters } from 'fireact'

function Component() {
  const {
    set,
    transaction,
    update
  } = useFirebaseDatabaseWriters('arbitrary/path/to/value')

  // functions can be executed inside a useEffect hook, component callback, etc.
}
```
