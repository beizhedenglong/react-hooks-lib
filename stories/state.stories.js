import { storiesOf } from '@storybook/react'

const section = name => `State|${name}`

storiesOf(section('useUndo'), module)
  .addLiveSource('demo', `
  const UndoCounter = () => {
    const {
      past, present, future, set, undo, redo,
    } = useUndo(0)
    return (
      <div>
        {\`counter: $\{present}\`}
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
  return <UndoCounter />
`)

storiesOf(section('useMergeState'), module)
  .addLiveSource('demo', `
 const MergeState = () => {
   const { state, set } = useMergeState({ name: 'Victor', age: 1 })
   return (
     <div>
       <div>
         {\`state: $\{JSON.stringify(state)}\`}
         <button onClick={() => set(({ age }) => ({ age: age + 1 }))}>age+1</button>
       </div>
     </div>
   )
 }
  return <MergeState />
`)

storiesOf(section('useNestedState'), module)
  .addLiveSource('demo', `
  const Contacts = () => {
    const { state, get, set } = useNestedState([])
    return (
      <div>
        <div>
          <ol>
            {state.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
              <li key={index} style={{ margin: 10, padding: 10, border: '1px solid black' }}>
                <label>
                  Name:
                  <input type="text" value={get(\`$\{index}.name\`, '')} onChange={e => set(\`$\{index}.name\`, e.target.value)} />
                </label>
                <label>
                  Age:
                  <input type="number" value={get(\`$\{index}.age\`, 0)} onChange={e => set(\`$\{index}.age\`, e.target.value)} />
                </label>
                <div>
                  <h4>Extra Info:</h4>
                  <label>
                    Email:
                    <input type="email" value={get(\`$\{index}.extraInfo.email\`, '')} onChange={e => set(\`$\{index}.extraInfo.email\`, e.target.value)} />
                  </label>
                </div>
              </li>
            ))}
          </ol>
          <button onClick={() => set('', prev => ([...prev, {}]))}>Add Contact</button>
        </div>
        <div>
          <h3>
            State:
          </h3>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </div>
    )
  }
  return <Contacts />
`)

storiesOf(section('useStateCallback'), module)
  .addLiveSource('demo', `
 const StateCallback = () => {
   const [number1, set1] = React.useState(0)
   const { state: number2, set: set2 } = useStateCallback(0, () => {
     console.log(number2)
     set1(prev => prev + 1)
   })
   return (
     <div>
       <span>{\`number1: $\{number1}, number2: $\{number2}\`}</span>
       <br />
       <button onClick={() => set2(prev => prev + 1)}>+1</button>
     </div>
   )
 }
  return <StateCallback />
`)

storiesOf(section('useCounter'), module)
  .addLiveSource('demo', `
  const Counter = () => {
    const { count, inc, dec } = useCounter(0)
    return (
      <div>
        count: {count}
        <button onClick={() => inc()}>+1</button>
        <button onClick={() => dec()}>-1</button>
      </div>
    )
  }
  return <Counter />
`)

storiesOf(section('useToggle'), module)
  .addLiveSource('demo', `
  const Toggle = () => {
    const { on, toggle, reset } = useToggle(false)
    return (
      <div>
        on: {String(on)}
        <button onClick={toggle}>toggle</button>
        <button onClick={reset}>reset</button>
      </div>
    )
  }
  return <Toggle />
`)

storiesOf(section('useList'), module)
  .addLiveSource('demo', `
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
  return <List />
`)


storiesOf(section('useMap'), module)
  .addLiveSource('demo', `
  const Map = () => {
    const { values, set } = useMap({ name: 'Victor', age: 18 })
    return (
      <div>
        values: {JSON.stringify(values)}
        <button onClick={() => set('age', age => age + 1)}>age + 1</button>
      </div>
    )
  }
  return <Map />
`)
