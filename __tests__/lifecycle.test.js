import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render, fireEvent,
} from 'react-testing-library'
import {
  useDidMount, useWillUnmount, useDidUpdate, useCounter,
} from '../src/index'

const didMountFn = jest.fn()
const willUnmountFn = jest.fn()
const didUpdateFn = jest.fn()
jest.useFakeTimers()

const Lifecycle = ({ count }) => {
  useDidMount(didMountFn)
  useWillUnmount(willUnmountFn)
  useDidUpdate(didUpdateFn)
  return <span data-testid="count-value">{count}</span>
}
const LifecycleExample = () => {
  const { count, inc } = useCounter(0)
  const counter2 = useCounter(2)
  return (
    <div>
      {
        count <= 3
          ? <Lifecycle count={count} count2={counter2.count} />
          : 'count > 3, component did unmount'
      }

      <button onClick={() => inc(1)}>+1</button>
    </div>
  )
}
const { getByText, getByTestId } = render(<LifecycleExample />)

test('lifecycle', async () => {
  jest.runAllTimers()
  expect(didMountFn).toBeCalledTimes(1)
  expect(didUpdateFn).toBeCalledTimes(0)
  expect(willUnmountFn).toBeCalledTimes(0)

  fireEvent.click(getByText('+1'))
  fireEvent.click(getByText('+1'))
  jest.runAllTimers()
  expect(getByTestId('count-value').textContent).toBe('2')
  expect(didMountFn).toBeCalledTimes(1)
  expect(didUpdateFn).toBeCalledTimes(2)
  expect(willUnmountFn).toBeCalledTimes(0)

  fireEvent.click(getByText('+1'))
  fireEvent.click(getByText('+1'))
  jest.runAllTimers()
  expect(didMountFn).toBeCalledTimes(1)
  expect(didUpdateFn).toBeCalledTimes(3)
  expect(willUnmountFn).toBeCalledTimes(1)
})
