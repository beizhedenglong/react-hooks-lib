import { useState } from 'react'
import { isNil } from '../utils'

const useBind = (initial, options = {
  propName: 'value',
  handlerName: 'onChange',
  map: x => x,
}) => {
  const [value, set] = useState(initial)
  const {
    propName = 'value',
    handlerName = 'onChange',
    map = x => x,
  } = options
  return {
    value,
    set,
    reset: () => set(initial),
    bind: {
      [propName]: isNil(value) ? initial : value,
      [handlerName]: newValue => set(map(newValue)),
    },
  }
}

export default useBind
