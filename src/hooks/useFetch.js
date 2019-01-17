import { useState, useEffect, useRef } from 'react'
import { cancelablePromise, shallowEqual } from '../utils'

// Inspired by https://github.com/tkh44/holen
const useFetch = (initialUrl, initialOptions = {}, onMount = true) => {
  const [config, setConfig] = useState({
    url: initialUrl,
    options: initialOptions,
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const canFetchRef = useRef(onMount)

  useEffect(() => {
    const { url, options } = config
    if (!canFetchRef.current) {
      canFetchRef.current = true
      return
    }
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

    return () => cancelable.cancel() // eslint-disable-line
  }, [config.url, config.options])

  const updateConfig = key => updater => setConfig((prev) => {
    const updated = typeof updater === 'function' ? updater(prev[key]) : updater

    // make sure not to re-fetch data when updated is shallow equal to prev[key]
    if (shallowEqual(updated, prev[key])) {
      return prev
    }
    return ({
      ...prev,
      [key]: updated,
    })
  })
  return {
    setUrl: updateConfig('url'),
    setOptions: updateConfig('options'),
    setData,
    loading,
    data,
    error,
    fetch: (url, options) => setConfig(prev => ({
      url: url || prev.url,
      // change reference of options， so that we can re-fetch data when call fetch
      options: { ...(options || prev.options) },
    })),
  }
}

export default useFetch
