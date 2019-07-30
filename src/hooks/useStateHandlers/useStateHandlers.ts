import * as R from 'ramda';
import React, { Dispatch, SetStateAction } from 'react';

interface StateHandlers<T> {
  set: R.Arity1Fn
  update: (props?: object) => void
  replace: Dispatch<SetStateAction<T | undefined>>
}

function useStateHandlers<T>(initialState?: T): [T | undefined, StateHandlers<T>] {
  const [state, setState] = React.useState<T | undefined>(initialState)

  const updateState = (props?: object) => setState(prevState => ({ ...Object(prevState), ...props }))

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