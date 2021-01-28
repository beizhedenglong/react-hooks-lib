import React, {
  createContext, useState, useEffect, useContext,
} from 'react'
import { identity } from '../utils'

const createGlobalState = (initial = {}) => {
  let state = initial
  let listeners = []

  const getState = () => state
  const subscribe = (f = identity) => {
    listeners.push(f)
    return () => {
      listeners = listeners.filter(l => l !== f)
    }
  }
  const set = (updater) => {
    if (typeof updater === 'function') {
      state = updater(state)
    } else {
      state = updater
    }
    listeners.forEach(f => f(state))
  }
  const initialStore = {
    getState,
    subscribe,
    set,
  }
  const context = createContext(initialStore)
  const { Provider, Consumer } = context
  const GlobalProvider = ({ children }) => (
    <Provider value={initialStore}>
      {children}
    </Provider>
  )
  const useStore = () => {
    const store = useContext(context)
    return store
  }

  const useSelector = (selector = identity) => {
    const initialValue = selector(state)
    const [value, setValue] = useState(initialValue)
    useEffect(() => {
      const l = (newState) => {
        const newValue = selector(newState)
        if (newValue !== value) {
          setValue(newValue)
        }
      }
      const unsubscribe = subscribe(l)
      return unsubscribe
    }, [])
    return value
  }
  const useSet = () => set

  const useGlobalState = () => {
    const storeState = useSelector()
    return {
      set,
      state: storeState,
    }
  }
  return {
    GlobalProvider,
    GlobalConsumer: Consumer,
    useStore,
    useGlobalState,
    set,
    getState,
    useSelector,
    useSet,
  }
}

export const createContextState = (initial = {}) => {
  const globalState = createGlobalState(initial)
  return {
    ContextProvider: globalState.GlobalProvider,
    ContextConsumer: globalState.GlobalConsumer,
    set: globalState.set,
    useContextState: globalState.useGlobalState,
    getState: globalState.getState,
    useStore: globalState.useStore,
    useSelector: globalState.useSelector,
    useSet: globalState.useSet,
  }
}
export default createGlobalState
