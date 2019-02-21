import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render, wait, fireEvent, act,
} from 'react-testing-library'
import {
  useOnlineStatus, useFetch,
} from '../src/index'

test('useOnlineStatus', () => {
  jest.useFakeTimers()
  Object.defineProperty(window.navigator, 'onLine', { value: false })
  const map = {}
  window.addEventListener = jest.fn((eventType, f) => {
    map[eventType] = f
  })
  const OnlineStatus = () => {
    const { online } = useOnlineStatus()
    return <div>{`${online}`}</div>
  }
  const { container } = render(<OnlineStatus />)
  jest.runAllTimers()
  expect(container.firstChild.textContent).toBe('false')
  act(() => map.online())
  expect(container.firstChild.textContent).toBe('true')
  act(() => map.offline())
  expect(container.firstChild.textContent).toBe('false')
})

// https://github.com/facebook/react/issues/14769#issuecomment-462528230
test('useFetch', async () => {
  jest.useFakeTimers()
  window.fetch = jest.fn(() => new Promise(resolve => resolve({
    json: () => ({ name: 'Victor' }),
  })))
  const Fetch = () => {
    const {
      data, loading, setUrl, fetch,
    } = useFetch('/test')
    return (
      <div>
        <button
          onClick={() => {
            setUrl('/test2')
          }}
        >
          search
        </button>
        <button onClick={() => fetch()}>fetch</button>
        <span data-testid="loading">{String(loading)}</span>
        <span data-testid="data">{JSON.stringify(data)}</span>
      </div>
    )
  }
  const { getByTestId, getByText } = render(<Fetch />)
  act(() => jest.runAllTimers())
  expect(getByTestId('loading').textContent).toBe('true')
  expect(window.fetch).toBeCalledTimes(1)
  await wait()
  expect(getByTestId('loading').textContent).toBe('false')
  expect(getByTestId('data').textContent).toBe(JSON.stringify({ name: 'Victor' }))
  fireEvent.click(getByText(/search/))
  act(() => jest.runAllTimers())
  expect(getByTestId('loading').textContent).toBe('true')
  expect(window.fetch).toBeCalledTimes(2)
  await wait()
  expect(getByTestId('loading').textContent).toBe('false')
  expect(getByTestId('data').textContent).toBe(JSON.stringify({ name: 'Victor' }))
  fireEvent.click(getByText(/fetch/))
  act(() => jest.runAllTimers())
  expect(getByTestId('loading').textContent).toBe('true')
  expect(window.fetch).toBeCalledTimes(3)
  await wait()
  expect(getByTestId('loading').textContent).toBe('false')
})
