import React from 'react'
import ReactDOM from 'react-dom'
import { useToggle, useCounter, useHover } from '../src/index'


const Toggle = () => {
  const { on, toggle, reset } = useToggle(false)
  return (
    <div>
      <h3>useToggle</h3>
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
      <h3>useCounter</h3>
      {String(count)}
      <button onClick={inc}>+1</button>
      <button onClick={dec}>+1</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

const Hover = () => {
  const { hovered, bind } = useHover()
  return (
    <div>
      <h3>useHover</h3>
      <div {...bind}>
        hovered:
        {String(hovered)}
      </div>
    </div>
  )
}

ReactDOM.render(
  <div>
    <Toggle />
    <Counter />
    <Hover />
  </div>,
  document.getElementById('app'),
)
