import * as R from 'ramda'

export const getEntityTypeById = R.curry((firebase, entityType, id) => (
  firebase.database().ref(`${entityType}/${id}`)
))