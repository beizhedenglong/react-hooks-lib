# React Hooks Lib

A set of reusable [React Hooks](https://reactjs.org/docs/hooks-reference.html#usestate).

>Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha and being discussed in an open RFC.

## Installation
`npm i react-hooks-lib --save`

## Examples
Vist [here](https://github.com/beizhedenglong/react-hooks-lib/blob/master/example/example.js)

## Hooks

| Name       | Input   | Output                                          |
| ---------- | ------- | ----------------------------------------------- |
| useCounter | initial | { count, set, reset, inc, dec, incBy, decBy }   |
| useToggle  | initial | { on, set, reset, toggle }                      |
| useList    | initial | { list, set, reset, push, sort, filter }        |
| useMap     | initial | { values, set, reset, clear, get, has, delete } |
| useHover   | -       | { hovered, bind }                               |
| useActive  | -       | { active, bind }                                |
| useFocus   | -       | { focused, bind }                               |
| useField   | initial       | { value, set, reset, bind }                     |

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
```js
import { useToggle } from 'react-hooks-lib'

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
```

### useList
```js
import { useList } from 'react-hooks-lib'
const List = () => {
  const { list, sort, filter } = useList([1, 4, 2, 3, 4, 2, 6, 8, 3, 4])
  return (
    <div>
      list:
      {JSON.stringify(list)}
      <button onClick={() => sort((x, y) => x - y)}>sort</button>
      <button onClick={() => filter(x => x >= 4)}> greater than or equal to 4</button>
    </div>
  )
}
```

### useMap

### useHover

``` js
import { useHover } from 'react-hooks-lib'

const Hover = () => {
  const { hovered, bind } = useHover()
  return (
    <div>
      <div {...bind}>
        hovered:
        {String(hovered)}
      </div>
    </div>
  )
}
```

### useActive

### useFocus

### useField
```js
  import {useField} from 'react-hooks-lib'

  const Input = () => {
    const { value, bind } = useField('Type Here...')

    return (
      <div>
        input text:
        {value}
        <input type="text" {...bind} />
      </div>
    )
  }

  const Select = () => {
    const { value, bind } = useField('apple')
    return (
      <div>
        selected:
        {value}
        <select {...bind}>
          <option value="apple">apple</option>
          <option value="orange">orange</option>
        </select>
      </div>
    )
  }
```