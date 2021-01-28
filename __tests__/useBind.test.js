import { renderHook, act } from '@testing-library/react-hooks'
import { useBind } from '../src'

test('useBind', () => {
  const { result } = renderHook(() => useBind('victor'))

  expect(result.current.value).toBe('victor')
  expect(result.current.bind.value).toBe('victor')
  act(() => {
    result.current.bind.onChange('wang')
  })
  expect(result.current.value).toBe('wang')
  expect(result.current.bind.value).toBe('wang')
  act(() => {
    result.current.reset()
  })
  expect(result.current.bind.value).toBe('victor')
})

test('useBind with options', () => {
  const { result } = renderHook(() => useBind('victor', {
    propName: 'name',
    handlerName: 'onNameChange',
    map: e => e.target.value,
  }))
  expect(result.current.value).toBe('victor')
  expect(result.current.bind.name).toBe('victor')
  act(() => {
    result.current.bind.onNameChange({ target: { value: 'wang' } })
  })
  expect(result.current.value).toBe('wang')
  expect(result.current.bind.name).toBe('wang')
})
test('useBind with options', () => {
  const { result } = renderHook(() => useBind('victor', {
    propName: 'name',
    handlerName: 'onNameChange',
    map: e => e.target.value,
  }))
  expect(result.current.value).toBe('victor')
  expect(result.current.bind.name).toBe('victor')
  act(() => {
    result.current.bind.onNameChange({ target: { value: 'wang' } })
  })
  expect(result.current.value).toBe('wang')
  expect(result.current.bind.name).toBe('wang')
})
