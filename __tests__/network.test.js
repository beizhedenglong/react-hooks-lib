import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render,
} from 'react-testing-library'
import {
  useOnlineStatus,
} from '../src/index'

test('useOnlineStatus', () => {
  Object.defineProperty(window.navigator, 'onLine', { value: false })
  const map = {}
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb
  })

  const OnlineStatus = () => {
    const { online } = useOnlineStatus()
    return <div>{`${online}`}</div>
  }
  const { container } = render(<OnlineStatus />)
  expect(container.firstChild.textContent).toBe('false')
})
