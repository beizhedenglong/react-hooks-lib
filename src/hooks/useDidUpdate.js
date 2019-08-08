import { useEffect, useRef } from 'react'


const useDidUpdate = (f, conditions) => {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    // Cleanup effects when f returns a function
    return f && f() //eslint-disable-line
  }, conditions)
}

export default useDidUpdate
