import useNestedState from './useNestedState'
import { defaultMap } from './useBind'

const useNestedBind = (initial) => {
  const { state, set, get } = useNestedState(initial)

  return {
    state,
    set,
    get,
    reset: () => set(initial),
    bindPath: (path, options = {
      propName: 'value',
      handlerName: 'onChange',
      defaultValue: undefined,
      map: defaultMap,
    }) => {
      const {
        propName = 'value',
        handlerName = 'onChange',
        defaultValue,
        map = defaultMap,
      } = options
      return ({
        [propName]: get(path, defaultValue),
        [handlerName]: newValue => set(path, map(newValue)),
      })
    },
  }
}

export default useNestedBind
