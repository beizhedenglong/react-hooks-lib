import 'react-testing-library/cleanup-after-each'
import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { useToggle } from '../src/index'

const Toggle = () => {
  const {
    on,
    reset,
    toggle,
    set,
  } = useToggle()
  return (
    <div>
      <span data-testid="on-value">{String(on)}</span>
      <button onClick={toggle}>toggle</button>
      <button onClick={reset}>reset</button>
      <button onClick={() => set(true)}>setTrue</button>
    </div>
  )
}

test('useToggle', () => {
  const { container, getByTestId, getByText } = render(<Toggle />)
  expect(container).toMatchSnapshot()
  expect(getByTestId('on-value').textContent).toBe('false')
  fireEvent.click(getByText('toggle'))
  expect(getByTestId('on-value').textContent).toBe('true')
  fireEvent.click(getByText('toggle'))
  expect(getByTestId('on-value').textContent).toBe('false')
  fireEvent.click(getByText('setTrue'))
  expect(getByTestId('on-value').textContent).toBe('true')
  fireEvent.click(getByText('reset'))
  expect(getByTestId('on-value').textContent).toBe('false')
})
