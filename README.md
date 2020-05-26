# React Hooks Lib &middot; ![](https://img.shields.io/github/license/beizhedenglong/react-hooks-lib.svg) [![Build Status](https://travis-ci.org/beizhedenglong/react-hooks-lib.svg?branch=master)](https://travis-ci.org/beizhedenglong/react-hooks-lib) [![Coverage Status](https://coveralls.io/repos/github/beizhedenglong/react-hooks-lib/badge.svg?branch=master&service=github)](https://coveralls.io/github/beizhedenglong/react-hooks-lib?branch=master)

A set of reusable [React Hooks](https://reactjs.org/docs/hooks-reference.html#usestate).

>Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

## Installation
`npm i react-hooks-lib --save`

## Examples
Visit [storybook](https://beizhedenglong.github.io/react-hooks-lib)

## Hooks

| Name                                                     | Arguments                          | Returns                                                      |
| -------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| <h6>Lifecycles</h6>                                      |                                    |                                                              |
| [`useDidMount`](#usedidmountf)                           | f                                  | -                                                            |
| [`useWillUnmount`](#usewillunmountf)                     | f                                  | -                                                            |
| [`useDidUpdate`](#usedidupdatef-options)                 | f, conditions                      | -                                                            |
| <h6>State</h6>                                           |                                    |                                                              |
| [`createContextState`](#createContextStateInitial)       | initial                            | { ContextProvider, ContextConsumer,  set, useSelector, useSet }  |
| [`createGlobalState`](#createGlobalStateInitial)         | initial                            | { GlobalProvider, GlobalConsumer, set, useSelector, useSet }      |
| [`useMergeState`](#usemergestateinitial)                 | initial                            | { state, set }                                               |
| [`useStateCallback`](#useStateCallbackInitial-f)         | initial, f                         | { state, set }                                               |
| [`useUndo`](#useUndoInitial)                             | initial                            | { past, present, future, set, undo, redo }                   |
| [`useCounter`](#useCounterInitial)                       | initial                            | { count, set, reset, inc, dec }                              |
| [`useToggle`](#useToggleInitial)                         | initial                            | { on, set, reset, toggle }                                   |
| [`useList`](#useListInitial)                             | initial                            | { list, set, reset, push, sort, filter }                     |
| [`useMap`](#useMapInitial)                               | initial                            | { values, set, reset, clear, get, has, del }                 |
| <h6>Effect</h6>                                      |                                    |                                                              |
| `useShallowEqualEffect`                                  | f, deps                            | -                                                            |
| `useDeepEqualEffect`                                     | f, deps                            | -                                                            |
| <h6>Network</h6>                                         |                                    |                                                              |
| [`useFetch`](#useFetchInitialUrl-initialOptions-onMount) | initialUrl, initialOptions, config | { loading, data, error, fetch, setUrl, setOptions, setData } |
| [`useOnlineStatus`](#useonlinestatus)                    |                                    |                                                              |
| <h6>Feedback</h6>                                        |                                    |                                                              |
| [`useHover`](#useHover)                                  | -                                  | { hovered, bind }                                            |
| [`useActive`](#useActive)                                | -                                  | { active, bind }                                             |
| [`useFocus`](#useFocus)                                  | -                                  | { focused, bind }                                            |
| [`useTouch`](#useTouch)                                  | -                                  | { touched, bind }                                            |
| <h6>Data Entry</h6>                                      |                                    |                                                              |
| [`useField`](#useFieldInitial)                           | initial                            | { value, set, reset, bind }                                  |


## API

### `useDidMount(f)`
Similar to `componentDidMount` in React class component. 
#### Arguments
- `f: () => void`: f is  called when component did mount.
```js
import { useDidMount } from 'react-hooks-lib'

const MyComponent = () => {
  useDidMount(() => {
    console.log('didMount')
  })
}
```

### `useWillUnmount(f)`
Close to the `componentWillUnmount` in React class component.
#### Arguments
- `f: () => void`: f is called when component will unmount.
```js
import { useWillUnmount } from 'react-hooks-lib'

const MyComponent = () => {
  useWillUnmount(() => {
    console.log('willUnmount')
  })
}
```

### `useDidUpdate(f, options?)`
Similar to `componentDidUpdate`, it only runs on updates.
#### Arguments
- `f: () => Function | void`: f is called on every updates. Like `useEffect`, f can return a clean-up function.
- `conditions?: Array<any>`: Optional array for conditionally firing an effect, same as the second argument passed to `useEffect`.
```js
import { useDidUpdate, useCounter } from 'react-hooks-lib'

const MyComponent = () => {
  const { count, inc } = useCounter(0)
  useDidUpdate(() => {
    console.log('DidUpdate')
  })
  return (
    <div>
      {`count: ${count}`}
      <button onClick={() => inc(1)}>+1</button>
    </div>
  )
}
```
### `createContextState(initial?)`

### `createGlobalState(initial?)`

### `useMergeState(initial?)`
#### Arguments
- `initial?: Object`: Initial state object, default is `{}`.
#### Returns
- `state: Object`: Current state object.
- `set: ((Object) => Object) | Object`: Like `setState` in React class component, merge the old and new state together.
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

### `useStateCallback(initial, f?)`

### `useUndo(initial)`

### `useCounter(initial)`
```js
import { useCounter } from 'react-hooks-lib'

const Counter = () => {
  const {
    count, inc, dec, reset,
  } = useCounter(1)
  return (
    <div>
      {count}
      <button onClick={() => inc(1)}>+1</button>
      <button onClick={() => dec(1)}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

```
### `useToggle(initial)`
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

### `useList(initial)`
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

### `useMap(initial)`

### `useFetch(initialUrl, initialOptions?, onMount?)`
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

### `useOnlineStatus()`

### `useHover()`

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

### `useActive()`

### `useFocus()`

### `useTouch()`

### `useField(initial)`
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
