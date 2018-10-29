# React Hooks Lib

A set of reusable [React Hooks](https://reactjs.org/docs/hooks-reference.html#usestate).

>Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha and being discussed in an open RFC.

## Installation
`npm i react-hooks-lib --save`

## Examples
Visit [here](https://github.com/beizhedenglong/react-hooks-lib/blob/master/example/example.js)

## Hooks

| Name                                          | Arguments                           | Returns                                             |
| --------------------------------------------- | ----------------------------------- | --------------------------------------------------- |
| [`useMergeState`](#usemergestateinitial) | initial                             | { state, set }                                      |
| [`useDidMount`](#usedidmountf)            | f                                   | -                                                   |
| [`useWillUnmount`](#usewillunmountf)      | f                                   | -                                                   |
| [`useDidUpdate`](#usedidupdatef-options) | f, conditions                       | -                                                   |
| [`useCounter`](#useCounter)                   | initial                             | { count, set, reset, inc, dec, incBy, decBy }       |
| [`useToggle`](#useToggle)                     | initial                             | { on, set, reset, toggle }                          |
| [`useList`](#useList)                         | initial                             | { list, set, reset, push, sort, filter }            |
| [`useMap`](#useMap)                           | initial                             | { values, set, reset, clear, get, has, delete }     |
| [`useHover`](#useHover)                       | -                                   | { hovered, bind }                                   |
| [`useActive`](#useActive)                     | -                                   | { active, bind }                                    |
| [`useFocus`](#useFocus)                       | -                                   | { focused, bind }                                   |
| [`useTouch`](#useTouch)                       | -                                   | { touched, bind }                                   |
| [`useField`](#useField)                       | initial                             | { value, set, reset, bind }                         |
| [`useFetch`](#useFetch)                       | initialUrl, initialOptions, onMount | { loading, data, error, fetch, setUrl, setOptions } |

## API

### `useMergeState(initial?)`
#### Arguments
- `initial?: Object`: Initial state object, default is `{}`.
#### Returns
- `state: Object`: Current state object.
- `set: (Function | Object) => Object`: Like `setState` in React class component, merge the old and new state together.
```js
import { useMergeState } from 'react-hooks-lib'

const MergeState = () => {
  const { state, set } = useMergeState({ name: 'Victor', age: 1 })
  return (
    <div>
      <h3>useMergeState</h3>
      <div>
        {`state: ${JSON.stringify(state)}`}
        <button onClick={() => set(({ age }) => ({ age: age + 1 }))}>age+1</button>
      </div>
    </div>
  )
}
```
### `useDidMount(f)`
Similar to `componentDidMount` in React class component. 
#### Arguments
- `f: () => void`: f will be called when component did mount.
```js
import { useDidMount } from 'react-hooks-lib'
const MyComponent = () => {
  useDidMount(() => {
    console.log('didMount')
  })
}
```

### `useWillUnmount(f)`
#### Arguments
#### Returns

### `useDidUpdate(f, options?)`
#### Arguments
#### Returns

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

### useTouch

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

### useFetch
```js
import { useField, useFetch } from 'react-hooks-lib'

const Fetch = () => {
  const getUrl = text => `https://api.github.com/search/repositories?q=${text}`
  const { value, bind } = useField('react')
  const { data, loading, setUrl } = useFetch(getUrl('react'))
  return (
    <div>
      <h3>useFetch</h3>
      <input type="text" value={value} {...bind} />
      <button onClick={() => {
        setUrl(getUrl(value))
      }}
      >
        search
      </button>
      {
        loading
          ? <div>Loading...</div>
          : (<span>{`total_count: ${data.total_count}`}</span>)
      }
    </div>
  )
}
```

### useOnlineStatus