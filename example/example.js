import React from 'react'
import ReactDOM from 'react-dom'
import {
  useToggle, useCounter, useHover, useActive, useFocus,
  useList, useMap,
} from '../src/index'


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
      <button onClick={dec}>-1</button>
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

const Active = () => {
  const { active, bind } = useActive()
  return (
    <div>
      <h3>useActive</h3>
      <div {...bind}>
        active:
        {String(active)}
      </div>
    </div>
  )
}

const Focus = () => {
  const { focused, bind } = useFocus()
  return (
    <div>
      <h3>useFocus</h3>
      focused:
      {String(focused)}
      <input type="text" {...bind} />
    </div>
  )
}

const List = () => {
  const { list, sort, filter } = useList([1, 4, 2, 3, 4, 2, 6, 8, 3, 4])
  return (
    <div>
      <h3>useList</h3>
      list:
      {JSON.stringify(list)}
      <button onClick={() => sort((x, y) => x - y)}>sort</button>
      <button onClick={() => filter(x => x >= 4)}> greater than or equal to 4</button>
    </div>
  )
}

const Map = () => {
  const { values, set } = useMap({ name: 'Victor', age: 18 })
  return (
    <div>
      <h3>useMap</h3>
      {JSON.stringify(values)}
      <button onClick={() => set('age', age => age + 1)}>age + 1</button>
    </div>
  )
}

ReactDOM.render(
  <div>
    <Toggle />
    <Counter />
    <Hover />
    <Active />
    <Focus />
    <List />
    <Map />
  </div>,
  document.getElementById('app'),
)
