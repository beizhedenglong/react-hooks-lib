import { useState } from 'react'

const useFocus = () => {
  const [focused, set] = useState(false)
  return {
    focused,
    bind: {
      onFocus: () => set(true),
      onBlur: () => set(false),
    },
  }
}

export default useFocus
