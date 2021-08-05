import { useState } from 'react'
import { isNil, get } from '../utils'

const defaultMap = (e) => {
  const tagName = get(e, ['target', 'tagName'])
  if (tagName !== undefined) {
    e.persist()
  }
  if (tagName === 'INPUT') {
    if (e.target.type === 'checkbox' || e.target.type === 'radio') {
      return e.target.checked
    }
    return e.target.value
  }
  if (tagName === 'SELECT') {
    const { target } = e
    if (target.multiple) {
      const value = Array.from(e.target.selectedOptions, option => option.value)
      return value
    }
    return e.target.value
  }
  if (tagName !== undefined) {
    return e.target.value
  }

  return e
}

const useBind = (initial, options = {
  propName: 'value',
  handlerName: 'onChange',
  map: defaultMap,
}) => {
  const [value, set] = useState(initial)
  const {
    propName = 'value',
    handlerName = 'onChange',
    map = defaultMap,
  } = options
  return {
    value,
    set,
    reset: () => set(initial),
    bind: {
      [propName]: isNil(value) ? initial : value,
      [handlerName]: (newValue) => {
        set(
          map(newValue),
        )
      },
    },
  }
}

export default useBind
