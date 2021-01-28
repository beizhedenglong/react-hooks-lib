import { renderHook, act } from '@testing-library/react-hooks'
import { useAsync } from '../src'

test('useAsync: resolve', async () => {
  const delay = time => new Promise(res => setTimeout(() => res(), time))
  const { result } = renderHook(() => useAsync(() => delay(100)))
  expect(result.current.loading).toBe(false)
  await act(() => result.current.f())
  expect(result.current.loading).toBe(false)
})

test('useAsync: reject', async () => {
  const delay = time => new Promise((res, rej) => setTimeout(() => rej('error'), time))
  const { result } = renderHook(() => useAsync(() => delay(100)))
  expect(result.current.loading).toBe(false)
  try {
    await act(() => result.current.f())
  } catch (error) {
    expect(result.current.loading).toBe(false)
  }
})
