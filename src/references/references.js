import * as R from 'ramda'

export const getEntityTypeByKey = R.curry((firebase, entityType, id) => (
  firebase.database().ref(`${entityType}/${id}`)
))

export const getChildOfRef = R.curry((reference, child) => (
  reference.child(child)
))