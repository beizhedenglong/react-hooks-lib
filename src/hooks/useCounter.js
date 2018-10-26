import { useState } from 'react'

const add = value => prev => prev + value
const useCounter = (initial = 0) => {
  const [count, set] = useState(initial)
  return {
    count,
    set,
    inc: () => set(add(1)),
    dec: () => set(add(-1)),
    incBy: value => set(add(value)),
    decBy: value => set(add(-value)),
    reset: () => set(initial),
  }
}

export default useCounter
