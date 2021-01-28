import { useEffect, useRef } from 'react'
import shallowEqual from 'shallowequal'
import deepEqual from 'lodash.isequal'

const isShallowEqual = (depsA = [], depsB = []) => {
  if (depsA.length !== depsB.length) {
    return false
  }
  return depsA.every((a, index) => shallowEqual(a, depsB[index]))
}

const useEqualEffect = (compareFn, f, deps) => {
  const ref = useRef([])
  if (!compareFn(ref.current, deps)) {
    ref.current = deps
  }
  useEffect(f, ref.current)
}

export const useShallowEqualEffect = (f, deps) => {
  useEqualEffect(isShallowEqual, f, deps)
}

export const useDeepEqualEffect = (f, deps) => {
  useEqualEffect(deepEqual, f, deps)
}
