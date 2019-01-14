import { useState, useEffect } from 'react'


const useOnlineStatus = () => {
  const [online, set] = useState(navigator.onLine)

  const handleOnline = () => set(true)
  const handleOffline = () => set(false)

  useEffect(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return {
    online,
  }
}

export default useOnlineStatus
