import { useState } from 'react'


const useToggle = (initial = false) => {
  const [on, setToggle] = useState(initial)
  return {
    on,
    set: setToggle,
    reset: () => setToggle(initial),
    toggle: () => setToggle(prev => !prev),
  }
}

export default useToggle
