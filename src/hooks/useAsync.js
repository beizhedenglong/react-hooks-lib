/* eslint-disable no-underscore-dangle */
import { useState } from 'react'

const useAsync = (f = () => {}) => {
  const [loading, setLoading] = useState(false)
  const _f = async (...args) => {
    setLoading(true)
    try {
      const res = await f(...args)
      setLoading(false)
      return res
    } catch (e) {
      setLoading(false)
      throw e
    }
  }
  return {
    f: _f,
    loading,
  }
}


export default useAsync
