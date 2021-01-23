import { useState } from 'react'

const useCheckbox = (initial) => {
  const [checked, set] = useState(initial)

  return {
    checked,
    set,
    reset: () => set(initial),
    bind: {
      checked,
      onChange: e => set(e.target.checked),
    },
  }
}

export default useCheckbox
