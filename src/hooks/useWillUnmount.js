import { useEffect } from 'react'


const useWillUnmount = f => useEffect(() => () => f && f(), [])

export default useWillUnmount
