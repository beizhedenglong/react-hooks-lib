import { useEffect } from 'react'

const useDidMount = f => useEffect(() => f && f(), [])

export default useDidMount
