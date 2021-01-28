import { useState } from 'react'

const useActive = () => {
  const [active, set] = useState(false)
  return {
    active,
    bind: {
      onMouseDown: () => set(true),
      onMouseUp: () => set(false),
    },
  }
}

export default useActive
