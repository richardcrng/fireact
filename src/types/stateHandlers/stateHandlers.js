/**
 * @typedef {Object} StateHandlers
 * 
 * @property {function} set - Sets state to provided argument
 *  if there is not already deep equality to that argument
 * 
 * @property {function} update - Spreads argument's properties
 *  inside of state
 * 
 * @property {function} replace - Sets state to provided argument
 *  and then refreshes the component (React.useState()[1] default)
 */