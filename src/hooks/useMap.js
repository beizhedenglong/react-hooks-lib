import { useState } from 'react'

const useMap = (initial = {}) => {
  const [values, set] = useState(initial)
  return {
    values,
    reset: () => set(initial),
    clear: () => set({}),
    get: key => values[key],
    has: key => Object.prototype.hasOwnProperty.call(values, key),
    del: key => set(({ [key]: deleted, ...rest }) => rest),
    set: (key, updater) => set(prev => ({
      ...prev,
      [key]: typeof updater === 'function' ? updater(prev[key]) : updater,
    })),
  }
}

export default useMap
