# React Hooks Lib

A set of reusable [React Hooks](https://reactjs.org/docs/hooks-reference.html#usestate).

>Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha and being discussed in an open RFC.

## Installation
`npm i react-hooks-lib --save`

## Examples
Vist [here](https://github.com/beizhedenglong/react-hooks-lib/blob/master/example/example.js)

## Hooks

| Name       | Input   | Output                                        |
| ---------- | ------- | --------------------------------------------- |
| useCounter | initial | { count, set, reset, inc, dec, incBy, decBy } |
| useToggle  | initial | { on, set, reset, toggle }                    |
| useList    | initial | { list, set, reset, push, sort, filter }      |
| useHover   |         | { hovered, bind }                             |
| useActive  |         | { active, bind }                              |
| useFocus   |         | { focused, bind }                             |

## Usage

### useCounter
```js
import { useCounter } from 'react-hooks-lib'

const Counter = () => {
  const {
    count, inc, dec, reset,
  } = useCounter(1)
  return (
    <div>
      {count}
      <button onClick={inc}>+1</button>
      <button onClick={dec}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

```
### useToggle

### useHover

``` js
import { useHover } from 'react-hooks-lib'

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
```
TODO
