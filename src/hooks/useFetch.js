import { useState, useEffect } from 'react'
import { cancelablePromise } from '../utils'

// Inspired by https://github.com/tkh44/holen
const useFetch = (initialUrl, initialOptions = {}) => {
  const [config, setConfig] = useState({
    url: initialUrl,
    options: initialOptions,
  })
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const { url, options } = config
    const cancelable = cancelablePromise(fetch(url, options))
    setLoading(true)
    cancelable.promise
      .then(res => res.json())
      .then((newData) => {
        setData(newData)
        setLoading(false)
        return newData
      }).catch((e) => {
        setError(e)
        setLoading(false)
        return e
      })

    return () => cancelable.cancel()
  }, [config.url, config.options])

  const updateConfig = key => updater => setConfig(prev => ({
    ...prev,
    [key]: typeof updater === 'function' ? updater(prev[key]) : updater,
  }))
  return {
    setUrl: updateConfig('url'),
    setOptions: updateConfig('options'),
    loading,
    data,
    error,
    fetch: (url, options) => setConfig(prev => ({
      url: url || prev.url,
      options: options || prev.options,
    })),
  }
}

export default useFetch
