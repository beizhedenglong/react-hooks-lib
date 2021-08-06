import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  render, fireEvent, screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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


test('useBind with select', async () => {
  const Select = () => {
    const select = useBind('lime')
    return (
      <div>
        <select data-testid="select" {...select.bind}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </div>
    )
  }
  render(<Select />)
  const target = screen.getByTestId('select')
  expect(target.value).toBe('lime')
  fireEvent.change(screen.getByTestId('select'), { target: { value: 'coconut' } })
  expect(target.value).toBe('coconut')
  expect(screen.getByText('Coconut').selected).toBe(true)
  fireEvent.change(screen.getByTestId('select'), { target: { value: 'mango' } })
  expect(target.value).toBe('mango')
  expect(screen.getByText('Mango').selected).toBe(true)
})


test('useBind with multiple select', async () => {
  const Select = () => {
    const select = useBind([])
    return (
      <div>
        <select multiple data-testid="select" {...select.bind}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </div>
    )
  }
  render(<Select />)
  userEvent.selectOptions(screen.getByRole('listbox'), ['lime', 'coconut'])

  expect(screen.getByRole('option', { name: 'Lime' }).selected).toBe(true)
  expect(screen.getByRole('option', { name: 'Coconut' }).selected).toBe(true)
})

test('useBind with checkbox', async () => {
  const Checkbox = () => {
    const checkbox = useBind(false, { propName: 'checkbox' })
    return <input data-testid="checkbox" type="checkbox" {...checkbox.bind} />
  }
  render(<Checkbox />)
  expect(screen.getByTestId('checkbox').checked).toBe(false)
  userEvent.click(screen.getByTestId('checkbox'))
  expect(screen.getByTestId('checkbox').checked).toBe(true)
})
