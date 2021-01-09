import { useState } from 'react'
import { get, set } from '../utils'


const useNestedState = (initial) => {
  const [state, setState] = useState(initial)
  return {
    state,
    get: (pathString, defaultValue) => get(state, pathString, defaultValue),
    set: (pathString, updater) => setState(prev => (typeof updater === 'function'
      ? set(prev, pathString, updater(get(prev, pathString)))
      : set(prev, pathString, updater))),
  }
}

export default useNestedState
