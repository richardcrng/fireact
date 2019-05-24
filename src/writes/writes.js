import * as R from 'ramda'
import references from '../references';

export const setEntityTypeByKey = R.curry((firebase, entityType, key, newValue) => (
  references.getEntityTypeByKey(firebase, entityType, key)
    .set(newValue)
))

export const updateEntityTypeByKey = R.curry((firebase, entityType, key, newProps) => (
  references.getEntityTypeByKey(firebase, entityType, key)
    .update({ key, ...newProps })
))