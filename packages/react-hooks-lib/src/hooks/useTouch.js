import { useState } from 'react'

const useTouch = () => {
  const [touched, set] = useState(false)
  return {
    touched,
    bind: {
      onTouchStart: () => set(true),
      onTouchEnd: () => set(false),
    },
  }
}

export default useTouch
