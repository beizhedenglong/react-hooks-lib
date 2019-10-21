import 'react-testing-library/cleanup-after-each'
import React, { useEffect } from 'react'
import {
  render, fireEvent,
} from 'react-testing-library'
import {
  useCounter, useDeepEqualEffect, useShallowEqualEffect,
} from '../src/index'

const fn = jest.fn()
const shallowFn = jest.fn()
const shallowFn2 = jest.fn()
const deepFn = jest.fn()
jest.useFakeTimers()


const Example = () => {
  const { inc } = useCounter(0)
  useEffect(fn, [{ name: 'victor' }])
  useShallowEqualEffect(shallowFn, [{ name: 'victor' }])
  useShallowEqualEffect(shallowFn2, [{ a: { b: 1 } }])
  useDeepEqualEffect(deepFn, [{ a: { b: 1 } }])
  return (
    <div>
      <button onClick={() => inc(1)}>+1</button>
    </div>
  )
}
const { getByText } = render(<Example />)

test('effect', async () => {
  jest.runAllTimers()
  expect(fn).toBeCalledTimes(1)
  expect(shallowFn).toBeCalledTimes(1)
  expect(shallowFn2).toBeCalledTimes(1)
  expect(deepFn).toBeCalledTimes(1)

  fireEvent.click(getByText('+1'))
  fireEvent.click(getByText('+1'))
  jest.runAllTimers()
  expect(fn).toBeCalledTimes(3)
  expect(shallowFn).toBeCalledTimes(1)
  expect(shallowFn2).toBeCalledTimes(3)
  expect(deepFn).toBeCalledTimes(1)
})
