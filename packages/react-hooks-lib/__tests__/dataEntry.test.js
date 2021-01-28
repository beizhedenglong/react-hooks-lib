import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render, fireEvent,
} from 'react-testing-library'
import { useField } from '../src/index'

test('useField', () => {
  const Input = () => {
    const { value, bind, reset } = useField('Type Here...')

    return (
      <div>
        <span>{value}</span>
        <button onClick={reset}>reset</button>
        <input type="text" {...bind} />
      </div>
    )
  }
  const { container, getByText } = render(<Input />)
  expect(container.firstChild.firstChild.textContent).toBe('Type Here...')
  fireEvent.input(container.firstChild.lastChild, { target: { value: 'a' } })
  expect(container.firstChild.firstChild.textContent).toBe('a')
  fireEvent.click(getByText('reset'))
  expect(container.firstChild.firstChild.textContent).toBe('Type Here...')
})
