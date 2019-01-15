import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render, wait, fireEvent,
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
  map.online()
  expect(container.firstChild.textContent).toBe('true')
  map.offline()
  expect(container.firstChild.textContent).toBe('false')
})

test('useFetch', async () => {
  jest.useFakeTimers()
  window.fetch = jest.fn(() => new Promise(resolve => resolve({
    json: () => ({ name: 'Victor' }),
  })))
  const Fetch = () => {
    const { data, loading, setUrl } = useFetch('/test')
    return (
      <div>
        <button
          data-testid="button"
          onClick={() => {
            setUrl('/test2')
          }}
        >
          search
        </button>
        <span data-testid="loading">{String(loading)}</span>
        <span data-testid="data">{JSON.stringify(data)}</span>
      </div>
    )
  }
  const { getByTestId, getByText } = render(<Fetch />)
  expect(getByTestId('loading').textContent).toBe('true')
  jest.runAllTimers()
  expect(window.fetch).toBeCalledTimes(1)
  await wait()
  expect(getByTestId('loading').textContent).toBe('false')
  expect(getByTestId('data').textContent).toBe(JSON.stringify({ name: 'Victor' }))
  fireEvent.click(getByText(/search/))
  jest.runAllTimers()
  expect(getByTestId('loading').textContent).toBe('true')
  expect(window.fetch).toBeCalledTimes(2)
  await wait()
  expect(getByTestId('loading').textContent).toBe('false')
  expect(getByTestId('data').textContent).toBe(JSON.stringify({ name: 'Victor' }))
})
