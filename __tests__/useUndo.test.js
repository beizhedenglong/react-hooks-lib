import { renderHook, act } from '@testing-library/react-hooks'
import { useUndo } from '../src'

test('useUndo', () => {
  const { result } = renderHook(() => useUndo(0))
  expect(result.current.present).toEqual(0)
  expect(result.current.past).toEqual([])
  expect(result.current.future).toEqual([])

  act(() => result.current.set(prev => prev + 1))
  expect(result.current.past).toEqual([0])
  expect(result.current.present).toEqual(1)
  expect(result.current.future).toEqual([])

  act(() => result.current.set(prev => prev + 1))
  expect(result.current.past).toEqual([0, 1])
  expect(result.current.present).toEqual(2)
  expect(result.current.future).toEqual([])

  act(() => result.current.undo())
  expect(result.current.past).toEqual([0])
  expect(result.current.present).toEqual(1)
  expect(result.current.future).toEqual([2])

  act(() => result.current.undo())
  expect(result.current.past).toEqual([])
  expect(result.current.present).toEqual(0)
  expect(result.current.future).toEqual([1, 2])

  act(() => result.current.redo())
  expect(result.current.past).toEqual([0])
  expect(result.current.present).toEqual(1)
  expect(result.current.future).toEqual([2])

  act(() => result.current.set(3))
  expect(result.current.past).toEqual([0, 1])
  expect(result.current.present).toEqual(3)
  expect(result.current.future).toEqual([])

  act(() => {
    result.current.undo()
    result.current.undo()
    result.current.undo()
  })
  expect(result.current.past).toEqual([])
  expect(result.current.present).toEqual(0)
  expect(result.current.future).toEqual([1, 3])

  act(() => {
    result.current.redo()
    result.current.redo()
    result.current.redo()
  })
  expect(result.current.past).toEqual([0, 1])
  expect(result.current.present).toEqual(3)
  expect(result.current.future).toEqual([])
})
