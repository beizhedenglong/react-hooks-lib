import { useState } from 'react'
import useDidUpdate from './useDidUpdate'


const useStateCallback = (initialState, f) => {
  const [state, set] = useState(initialState)
  useDidUpdate(f, [state])
  return { state, set }
}

export default useStateCallback
