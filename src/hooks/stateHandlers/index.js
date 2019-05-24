import * as R from 'ramda';
import React from 'react';

/**
 * 
 * @param {Object} initialState 
 * 
 * @returns {array} [state, { set, update, replace }]
 */
function useStateHandlers(initialState) {
  const [state, setState] = React.useState(initialState)

  const updateState = React.useCallback((props) => (
    setState(prevState => ({ ...prevState, ...props }))
  ), [setState])

  const setStateIfNew = React.useCallback(
    R.ifElse(
      R.equals(state),    // if argument is equal to state...
      R.identity,         // ... then placeholder function (do nothing)...
      setState            // else: set state to the argument
    ), [state, setState]
  )

  return [
    state,
    {
      set: setStateIfNew,
      update: updateState,
      replace: setState
    }
  ]
}

export default useStateHandlers;