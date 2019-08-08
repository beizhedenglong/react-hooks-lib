import { useState } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useStateCallback } from '../src'

test('useStateCallback', () => {
  const cb = jest.fn()
  const useTestHook = () => {
    const { state: state1, set: set1 } = useStateCallback(0, cb)
    const [state2, set2] = useState(0)
    return {
      state1,
      set1,
      state2,
      set2,
    }
  }
  const { result } = renderHook(() => useTestHook())
  expect(result.current.state1).toBe(0)
  expect(cb).toBeCalledTimes(0)
  act(() => result.current.set1(prev => prev + 1))
  expect(result.current.state1).toBe(1)
  expect(cb).toBeCalledTimes(1)

  act(() => result.current.set2(prev => prev + 1))
  expect(cb).toBeCalledTimes(1)
})
