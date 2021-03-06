# Fireact

[![Build Status](https://travis-ci.com/richardcrng/fireact.svg?branch=master)](https://travis-ci.com/richardcrng/fireact)

## Explainer
Fireact is a library of React hooks that provide easy access to Firebase products inside your React app.

### Example use case
With hooks like [`useFirebaseDatabaseState`](#usefirebasedatabasestatepath-options--), there's an easy API for:
* subscribing a component to data in your Firebase Real-Time Database;
* triggering updates to your data in your Firebase Real-Time Database.

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

Any components that are wrapped in `Provider`, or have a parent/ancestor wrapped in `Provider`, gain access to the library's hooks.

Most notable of these are:
* [`useFirebase`](#usefirebase)
* [`useFirebaseCurrentUser`](#usefirebasecurrentuser)
* [`useFirebaseDatabaseState`](#usefirebasedatabasestatepath-options--)

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

### `useFirebaseDatabaseState(path, [options = {}])`
#### Parameters
* `path` *(string)*: path to a value in the Firebase Real-Time Database
* `options` *(object, optional)*: a configuration object for sorting and filtering

#### Returns
An array with two elements:
1. The current value of the Firebase Real-Time Database at `path`; and 
2. An object of functions which can be used to write to Firebase Real-Time Database at `path`.

These are the two return values, respectively, from [`useFirebaseDatabaseValue`](##usefirebasedatabasevaluepath-options--) and [`useFirebaseDatabaseWriters`](#usefirebasedatabasewriterspath).

#### Example
```js
import React from 'react'
import { useFirebaseDatabaseState } from 'fireact'

function Component() {
  const [value, { set, transaction, update, push, pushWithKey }] = useFirebaseDatabaseState('arbitrary/path/to/entry')

  // your logic here
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
  const value = useFirebaseDatabaseValue('arbitrary/path/to/entry')

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
| `push` | Takes an value, [auto-generates](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html) a [push key](https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data) for it, and updates the RTD at said key from path with the passed in value | [`firebase.database.Reference.push`](https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#push) |
| `pushWithKey` | Takes a callback, `(autoGeneratedPushKey) => value`, which updates the RTD at the auto-generated push key from path (as above, with the vanilla `push`) to the return value of the callback | N/A |

#### Example
```js
import React from 'react'
import { useFirebaseDatabaseWriters } from 'fireact'

function Component() {
  const {
    set,
    transaction,
    update,
    push,
    pushWithKey
  } = useFirebaseDatabaseWriters('arbitrary/path/to/entry')

  // functions can be executed inside a useEffect hook, component callback, etc.
}
```
