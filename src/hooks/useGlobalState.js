import React, {
  createContext, useState, useEffect, useContext,
} from 'react'

const createGlobalState = (initial = {}) => {
  let state = initial
  let listeners = []
  const set = (updater) => {
    if (typeof updater === 'function') {
      state = updater(state)
    } else {
      state = updater
    }
    listeners.forEach(f => f())
  }
  const context = createContext(state)
  const { Provider, Consumer } = context
  const GlobalProvider = ({ children }) => {
    const [value, setValue] = useState(state)
    useEffect(() => {
      const listener = () => {
        if (state !== value) {
          setValue(state)
        }
      }
      listeners.push(listener)
      return () => {
        listeners = listeners.filter(l => l !== listener)
      }
    }, [])
    return (
      <Provider value={value}>
        {children}
      </Provider>
    )
  }
  const useGlobalState = () => {
    const contextState = useContext(context)
    return {
      set,
      state: contextState,
    }
  }
  return {
    GlobalProvider,
    GlobalConsumer: Consumer,
    useGlobalState,
    set,
    getState: () => state,
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
  }
}
export default createGlobalState
