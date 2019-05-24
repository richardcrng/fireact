import * as R from 'ramda'

import { firebaseInstance } from '..';

export const getEntityTypeById = R.curry((entityType, id) => (
  firebaseInstance.database().ref(`${entityType}/${id}`)
))