import * as R from 'ramda'
import references from '../references';

export const setEntityTypeById = (entityType, id, newValue) => (
  references.getEntityTypeById(entityType, id)
    .set(newValue)
)

export const updateEntityTypeById = (entityType, id, newProps) => (
  references.getEntityTypeById(entityType, id)
    .update(newProps)
)