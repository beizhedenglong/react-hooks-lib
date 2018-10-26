import { useState } from 'react'


const useHover = () => {
  const [hovered, set] = useState(false)
  return {
    hovered,
    bind: {
      onMouseEnter: () => set(true),
      onMouseLeave: () => set(false),
    },
  }
}

export default useHover
