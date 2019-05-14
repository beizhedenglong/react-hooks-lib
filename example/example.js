import React from 'react'
import ReactDOM from 'react-dom'
import {
  useToggle, useCounter, useHover, useActive, useFocus,
  useList, useMap, useField, useFetch, useTouch, useMergeState,
  useOnlineStatus, useDidMount, useWillUnmount, useDidUpdate,
  createContextState, useUndo,
} from '../src/index'

const UndoCounter = () => {
  const {
    past, present, future, set, undo, redo,
  } = useUndo(0)
  return (
    <div>
      <h3>useUndo</h3>
      {`counter: ${present}`}
      <button onClick={() => set(prev => prev + 1)}>+1</button>
      <button
        onClick={undo}
        disabled={past.length === 0}
      >
        undo
      </button>
      <button
        onClick={redo}
        disabled={future.length === 0}
      >
        redo
      </button>
    </div>
  )
}

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
      <button onClick={() => inc(1)}>+1</button>
      <button onClick={() => dec(1)}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

const Input = () => {
  const { value, bind } = useField('Type Here...')

  return (
    <div>
      <h3>useFiled: input</h3>
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
      <h3>useFiled: select</h3>
      selected:
      {value}
      <select {...bind}>
        <option value="apple">apple</option>
        <option value="orange">orange</option>
      </select>
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

const Fetch = () => {
  const getUrl = text => `https://api.github.com/search/repositories?q=${text}`
  const { value, bind } = useField('react')
  const { data, loading, setUrl } = useFetch(getUrl('react'))
  return (
    <div>
      <h3>useFetch: GET</h3>
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

const PostFetch = () => {
  const { data, loading, setOptions } = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    { method: 'POST' },
    { onMount: false },
  )
  return (
    <div>
      <h3>useFetch: POST</h3>
      {!loading && JSON.stringify(data)}
      <button
        onClick={() => setOptions(prev => ({
          ...prev, body: JSON.stringify([1, 2, 3]),
        }))}
      >
        submit
      </button>
    </div>
  )
}

const Touch = () => {
  const { touched, bind } = useTouch()
  return (
    <div>
      <h3>useTouch</h3>
      <div {...bind}>{`touched: ${touched}`}</div>
    </div>
  )
}
const OnlineStatus = () => {
  const { online } = useOnlineStatus()
  return (
    <div>
      <h3>useOnlineStatus</h3>
      <div>{`online: ${online}`}</div>
    </div>
  )
}

const Lifecycle = ({ count }) => {
  useDidMount(() => {
    console.log('didMount')
  })
  useWillUnmount(() => {
    console.log('willUnmount')
  })
  useDidUpdate(() => {
    console.log('didUpdate')
  })
  return `count: ${count}`
}
const LifecycleExample = () => {
  const { count, inc } = useCounter(0)
  const counter2 = useCounter(2)
  return (
    <div>
      <h3>Lifecycle</h3>
      {
        count <= 3
          ? <Lifecycle count={count} count2={counter2.count} />
          : 'count > 3, component did unmount'
      }

      <button onClick={() => inc(1)}>+1</button>
    </div>
  )
}

const { ContextProvider, useContextState } = createContextState({ counter: 1 })

const ContextState = () => {
  const { state, set } = useContextState()
  return (
    <div>
      <h3>ContextState</h3>
      counter:
      {state.counter}
      <button onClick={() => set(prev => ({ counter: prev.counter + 1 }))}>+1</button>
    </div>
  )
}

ReactDOM.render(
  <div>
    <UndoCounter />
    <br />
    <ContextProvider>
      <ContextState />
    </ContextProvider>
    <MergeState />
    <hr />
    <Toggle />
    <hr />
    <Counter />
    <hr />
    <Hover />
    <hr />
    <Active />
    <hr />
    <Focus />
    <hr />
    <Touch />
    <hr />
    <List />
    <hr />
    <Map />
    <hr />
    <Input />
    <hr />
    <Select />
    <hr />
    {/* <Fetch />
    <PostFetch /> */}
    <hr />
    <OnlineStatus />
    <hr />
    <LifecycleExample />
  </div>,
  document.getElementById('app'),
)
