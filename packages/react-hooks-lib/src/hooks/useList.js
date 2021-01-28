import { useState } from 'react'

const useList = (initial = []) => {
  const [list, set] = useState(initial)
  return {
    list,
    set,
    reset: () => set(initial),
    push: (...values) => set(prev => [...prev, ...values]),
    sort: fn => set(prev => [...prev].sort(fn)),
    filter: fn => set(prev => prev.filter(fn)),
  }
}

export default useList
