import { useState } from 'react'

const useMergeState = (initial = {}) => {
  const [state, set] = useState(initial)
  return {
    state,
    set: updater => set(prev => (typeof updater === 'function'
      ? { ...prev, ...updater(prev) }
      : { ...prev, ...updater })),
  }
}

export default useMergeState
