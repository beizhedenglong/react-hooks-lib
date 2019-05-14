import useMergeState from './useMergeState'

const useUndo = (initial) => {
  const {
    state,
    set,
  } = useMergeState({
    past: [],
    present: initial,
    future: [],
  })
  const undo = () => {
    set((prevState) => {
      const { past, present, future } = prevState
      if (past.length === 0) {
        return prevState
      }
      const previous = past[past.length - 1]
      return {
        past: past.slice(0, past.length - 1),
        present: previous,
        future: [present, ...future],
      }
    })
  }
  const redo = () => {
    set((prevState) => {
      const { past, present, future } = prevState
      if (future.length === 0) {
        return prevState
      }
      const [next, ...restFuture] = future
      return {
        past: [...past, present],
        present: next,
        future: restFuture,
      }
    })
  }
  const setPresent = updater => set(({ present, past }) => ({
    past: [...past, present],
    present: typeof updater === 'function' ? updater(present) : updater,
    future: [],
  }))
  return {
    ...state,
    undo,
    redo,
    set: setPresent,
  }
}

export default useUndo
