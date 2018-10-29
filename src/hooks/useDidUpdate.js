import { useEffect, useRef } from 'react'


const useDidUpdate = (f, conditions) => {
  const didMoutRef = useRef(false)
  useEffect(() => {
    if (!didMoutRef.current) {
      didMoutRef.current = true
      return
    }

    // Cleanup effects when f returns a function
    return f && f() //eslint-disable-line
  }, conditions)
}

export default useDidUpdate
