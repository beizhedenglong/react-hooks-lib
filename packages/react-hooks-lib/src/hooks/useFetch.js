import { useState, useEffect, useRef } from 'react'
import { cancelablePromise, shallowEqual } from '../utils'
import useMergeState from './useMergeState'

// Inspired by https://github.com/tkh44/holen
const useFetch = (
  initialUrl,
  initialOptions = {},
  { onMount = true, onResponse = () => { } } = {},
) => {
  const [config, setConfig] = useState({
    url: initialUrl,
    options: initialOptions,
  })
  const { state, set } = useMergeState({
    loading: true,
    data: null,
    error: null,
  })
  const canFetchRef = useRef(onMount)

  useEffect(() => {
    const { url, options } = config
    if (!canFetchRef.current) {
      canFetchRef.current = true
      return
    }
    const cancelable = cancelablePromise(fetch(url, options))
    set({ loading: true })
    cancelable.promise
      .then(res => res.json())
      .then((newData) => {
        set(({ error }) => {
          onResponse(error, newData)
          return {
            data: newData,
            loading: false,
          }
        })
        return newData
      }).catch((e) => {
        set(({ data }) => {
          onResponse(e, data)
          return {
            error: e,
            loading: false,
          }
        })
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
    setData: updater => set(
      ({ data }) => (typeof updater === 'function'
        ? { data: updater(data) }
        : { data: updater }),
    ),
    loading: state.loading,
    data: state.data,
    error: state.error,
    fetch: (urlUpdater, optionsUpdater) => setConfig(prev => ({
      url: typeof urlUpdater === 'function' ? urlUpdater(prev.url) : (urlUpdater || prev.url),
      // change reference of options， so that we can re-fetch data when call fetch
      options: typeof optionsUpdater === 'function' ? optionsUpdater(prev.options) : { ...(optionsUpdater || prev.options) },
    })),
  }
}

export default useFetch
