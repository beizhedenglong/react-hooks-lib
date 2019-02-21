import 'react-testing-library/cleanup-after-each'
import React, { useState } from 'react'
import {
  render, fireEvent, act,
} from 'react-testing-library'
import {
  useMergeState,
  createGlobalState,
  createContextState,
  useToggle, useCounter,
  useList, useMap,
} from '../src/index'

jest.useFakeTimers()

test('useMergeState', () => {
  const MergeState = () => {
    const { state, set } = useMergeState({ name: 'Victor', age: 1 })
    return (
      <div>
        <span data-testid="state-value">{`${JSON.stringify(state)}`}</span>
        <button onClick={() => set(({ age }) => ({ age: age + 1 }))}>age+1</button>
        <button onClick={() => set({ name: 'hello' })}>setName</button>
      </div>
    )
  }
  const { getByTestId, getByText } = render(<MergeState />)
  const getState = () => JSON.parse(
    getByTestId('state-value').textContent,
  )
  expect(getState()).toEqual({ name: 'Victor', age: 1 })
  fireEvent.click(getByText('age+1'))
  expect(getState()).toEqual({ name: 'Victor', age: 2 })
  fireEvent.click(getByText('setName'))
  expect(getState()).toEqual({ name: 'hello', age: 2 })
})

test('createGlobalState', () => {
  const {
    GlobalProvider, set, getState, useGlobalState,
  } = createGlobalState()
  const Global = () => {
    const { state } = useGlobalState()
    return <span data-testid="state-value">{JSON.stringify(state)}</span>
  }
  const App = () => <GlobalProvider><Global /></GlobalProvider>

  const { getByTestId } = render(<App />)
  jest.runAllTimers()
  expect(getState()).toEqual({})
  act(() => set({ name: 'Victor' }))
  expect(getState()).toEqual({ name: 'Victor' })
  act(() => set(prev => ({ ...prev, age: 21 })))
  expect(getState()).toEqual({ name: 'Victor', age: 21 })
  expect(getByTestId('state-value').textContent).toEqual(JSON.stringify({ name: 'Victor', age: 21 }))
})

test('createContextState', () => {
  const {
    ContextProvider, set, getState, useContextState,
  } = createContextState()
  const Context = () => {
    const { state, set } = useContextState() // eslint-disable-line
    return (
      <div>
        <span data-testid="state-value">{JSON.stringify(state)}</span>
        <button onClick={() => set(prev => ({ ...prev, age: prev.age + 1 }))}>age+1</button>
        <button onClick={() => set(state)}>keepSame</button>
      </div>
    )
  }
  const App = () => <ContextProvider><Context /></ContextProvider>

  const { getByTestId, getByText } = render(<App />)
  jest.runAllTimers()
  expect(getState()).toEqual({})
  act(() => set({ name: 'Victor' }))
  expect(getState()).toEqual({ name: 'Victor' })
  act(() => set(prev => ({ ...prev, age: 21 })))
  expect(getState()).toEqual({ name: 'Victor', age: 21 })
  expect(getByTestId('state-value').textContent).toEqual(JSON.stringify({ name: 'Victor', age: 21 }))
  fireEvent.click(getByText('age+1'))
  expect(getState()).toEqual({ name: 'Victor', age: 22 })
  fireEvent.click(getByText('keepSame'))
  expect(getState()).toEqual({ name: 'Victor', age: 22 })
})

test('useToggle', () => {
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

test('useCounter', () => {
  const Counter = () => {
    const {
      count, inc, dec, reset,
    } = useCounter()
    return (
      <div>
        <span data-testid="count">{String(count)}</span>
        <button onClick={() => inc()}>+1</button>
        <button onClick={() => dec()}>-1</button>
        <button onClick={reset}>reset</button>
      </div>
    )
  }
  const { getByTestId, getByText } = render(<Counter />)
  expect(getByTestId('count').textContent).toBe('0')
  fireEvent.click(getByText('+1'))
  expect(getByTestId('count').textContent).toBe('1')
  fireEvent.click(getByText('reset'))
  expect(getByTestId('count').textContent).toBe('0')
  fireEvent.click(getByText('-1'))
  expect(getByTestId('count').textContent).toBe('-1')
})

test('useList', () => {
  const List = () => {
    const {
      list, sort, filter, reset, push,
    } = useList()
    return (
      <div>
        <span>{JSON.stringify(list)}</span>
        <button onClick={() => push(1, 4, 2, 3, 4, 2, 6, 8, 3, 4)}>push</button>
        <button onClick={() => sort((x, y) => x - y)}>sort</button>
        <button onClick={() => filter(x => x >= 4)}>greater than or equal to 4</button>
        <button onClick={reset}>reset</button>
      </div>
    )
  }
  const { container, getByText } = render(<List />)
  fireEvent.click(getByText('push'))
  expect(container.firstChild.firstChild.textContent)
    .toBe(JSON.stringify([1, 4, 2, 3, 4, 2, 6, 8, 3, 4]))
  fireEvent.click(getByText('sort'))
  expect(container.firstChild.firstChild.textContent)
    .toBe(JSON.stringify([1, 4, 2, 3, 4, 2, 6, 8, 3, 4].sort((a, b) => a - b)))
  fireEvent.click(getByText('greater than or equal to 4'))
  expect(container.firstChild.firstChild.textContent).toBe(
    JSON.stringify([1, 4, 2, 3, 4, 2, 6, 8, 3, 4]
      .sort((a, b) => a - b).filter(x => x >= 4)),
  )
  fireEvent.click(getByText('reset'))
  expect(container.firstChild.firstChild.textContent)
    .toBe(JSON.stringify([]))
})

test('useMap', () => {
  const Map = () => {
    const {
      values, set, has, del, reset, clear,
    } = useMap({ name: 'Victor', age: 18 })
    const [hasAge, setHasAge] = useState(has('age'))
    return (
      <div>
        <span data-testid="values">{JSON.stringify(values)}</span>
        <span
          data-testid="hasAge"
          onClick={() => setHasAge(has('age'))}
        >
          {String(hasAge)}
        </span>
        <button onClick={() => set('age', age => age + 1)}>age + 1</button>
        <button onClick={() => del('age')}>delete age</button>
        <button onClick={reset}>reset</button>
        <button onClick={clear}>clear</button>
      </div>
    )
  }
  const { getByText, getByTestId } = render(<Map />)
  expect(getByTestId('values').textContent).toBe(JSON.stringify({ name: 'Victor', age: 18 }))
  expect(getByTestId('hasAge').textContent).toBe('true')
  fireEvent.click(getByText('age + 1'))
  expect(getByTestId('values').textContent).toBe(JSON.stringify({ name: 'Victor', age: 19 }))
  fireEvent.click(getByText('delete age'))
  fireEvent.click(getByTestId('hasAge'))
  expect(getByTestId('hasAge').textContent).toBe('false')
  fireEvent.click(getByText('reset'))
  expect(getByTestId('values').textContent).toBe(JSON.stringify({ name: 'Victor', age: 18 }))
  fireEvent.click(getByText('clear'))
  expect(getByTestId('values').textContent).toBe(JSON.stringify({}))
})
