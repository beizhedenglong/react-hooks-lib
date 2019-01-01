import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render, fireEvent,
} from 'react-testing-library'
import {
  useMergeState,
  createGlobalState,
  createContextState,
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
  set({ name: 'Victor' })
  expect(getState()).toEqual({ name: 'Victor' })
  set(prev => ({ ...prev, age: 21 }))
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
  set({ name: 'Victor' })
  expect(getState()).toEqual({ name: 'Victor' })
  set(prev => ({ ...prev, age: 21 }))
  expect(getState()).toEqual({ name: 'Victor', age: 21 })
  expect(getByTestId('state-value').textContent).toEqual(JSON.stringify({ name: 'Victor', age: 21 }))
  fireEvent.click(getByText('age+1'))
  expect(getState()).toEqual({ name: 'Victor', age: 22 })
  fireEvent.click(getByText('keepSame'))
  expect(getState()).toEqual({ name: 'Victor', age: 22 })
})
