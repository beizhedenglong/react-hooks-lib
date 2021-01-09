import { renderHook, act } from '@testing-library/react-hooks'
import { useNestedState } from '../src'

test('useNestedState', () => {
  const { result } = renderHook(() => useNestedState())
  expect(result.current.state).toEqual(undefined)
  expect(result.current.get('a.b.c')).toEqual(undefined)
  expect(result.current.get('a.b.c', 'default')).toEqual('default')
  act(() => {
    result.current.set('a.b.c', 1)
  })
  expect(result.current.state).toEqual({ a: { b: { c: 1 } } })
  expect(result.current.get('')).toEqual({ a: { b: { c: 1 } } })
  expect(result.current.get('a.b.c')).toEqual(1)
  act(() => {
    result.current.set('b[0].c', 1)
    result.current.set('b[0].c', prev => prev + 1)
  })
  expect(result.current.state).toEqual({ a: { b: { c: 1 } }, b: [{ c: 2 }] })
})
