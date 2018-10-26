import React from 'react'
import ReactDOM from 'react-dom'
import { useToggle, useCounter } from '../dist/react-hooks-lib'


const Toggle = () => {
  const { on, toggle, reset } = useToggle(false)
  return (
    <div>
      {String(on)}
      <button onClick={toggle}>toggle</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

const Counter = () => {
  const {
    count, inc, dec, reset,
  } = useCounter(1)
  return (
    <div>
      {count}
      <button onClick={inc}>+1</button>
      <button onClick={dec}>+1</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

ReactDOM.render(
  <div>
    <Toggle />
    <Counter />
  </div>,
  document.getElementById('app'),
)
