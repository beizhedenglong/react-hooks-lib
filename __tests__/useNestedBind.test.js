import { renderHook, act } from '@testing-library/react-hooks'
import { useNestedBind } from '../src'

test('useNestedBind', () => {
  const initial = {
    name: 'Victor',
    age: 100,
    friends: [{
      name: 'Bob',
      age: 20,
    }],
  }
  const { result } = renderHook(() => useNestedBind(initial))
  expect(result.current.state).toEqual(initial)
  expect(result.current.bindPath('name').value).toBe('Victor')
  act(() => result.current.bindPath('name').onChange('Wang'))
  expect(result.current.bindPath('name').value).toBe('Wang')
  act(() => result.current.bindPath('friends.0.name').onChange('Bob2'))
  expect(result.current.bindPath('friends.0.name').value).toBe('Bob2')
})
