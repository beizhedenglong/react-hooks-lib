import { useState } from 'react'

const useField = (initial) => {
  const [value, set] = useState(initial)

  return {
    value,
    set,
    reset: () => set(value),
    bind: {
      value,
      onChange: e => set(e.target.value),
    },
  }
}

export default useField
