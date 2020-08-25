/* eslint-disable no-underscore-dangle */
import { useState } from 'react'

const useAsync = (f = () => {}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const _f = async (...args) => {
    setLoading(true)
    try {
      const res = await f(...args)
      setLoading(false)
      setError(undefined)
      return res
    } catch (e) {
      setLoading(false)
      setError(e)
      throw e
    }
  }
  return {
    f: _f,
    error,
    loading,
  }
}


export default useAsync
