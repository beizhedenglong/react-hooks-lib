import useNestedState from './useNestedState'

const useNestedBind = (initial) => {
  const { state, set, get } = useNestedState(initial)

  return {
    state,
    set,
    get,
    reset: () => set(initial),
    bind: {
      value: state,
      onChange: newState => set('', newState),
    },
    createBind: (pathString, options = {
      propName: 'value',
      handlerName: 'onChange',
      defaultValue: undefined,
      map: x => x,
    }) => {
      const {
        propName = 'value',
        handlerName = 'onChange',
        defaultValue,
        map = x => x,
      } = options
      return ({
        [propName]: get(pathString, defaultValue),
        [handlerName]: newValue => set(pathString, map(newValue)),
      })
    },
  }
}

export default useNestedBind
