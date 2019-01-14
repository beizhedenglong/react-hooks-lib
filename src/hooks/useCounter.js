import { useState } from 'react'

const add = value => prev => prev + value
const useCounter = (initial = 0) => {
  const [count, set] = useState(initial)
  return {
    count,
    set,
    inc: (number = 1) => set(add(number)),
    dec: (number = 1) => set(add(-number)),
    reset: () => set(initial),
  }
}

export default useCounter
