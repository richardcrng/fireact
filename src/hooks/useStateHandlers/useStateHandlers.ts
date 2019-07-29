import R from 'ramda';
import React from 'react';

function useStateHandlers<T>(initialState: T) {
  const [state, setState] = React.useState<T>(initialState)

  const updateState = (props: object) => setState(prevState => ({ ...prevState, ...props }))

  const setStateIfNew = R.ifElse(
    R.equals(state),    // if argument is equal to state...
    R.identity,         // ... then placeholder function (do nothing)...
    setState            // else: set state to the argument
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