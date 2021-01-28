import { storiesOf } from '@storybook/react'

const section = name => `Effect|${name}`

storiesOf(section('useDeepEqualEffect & useShallowEqualEffect'), module)
  .addLiveSource('demo', `
 const Example = () => {
   const { count, inc } = useCounter(0)
   React.useEffect(() => {
     // will be called on every render
     console.log("useEffect")
   }, [{ name: 'victor' }])

  useShallowEqualEffect(() => {
    // only be called on first render
    console.log("useShallowEqualEffect1")
  }, [{ name: 'victor' }])

  useShallowEqualEffect(() => {
    // will be called on every render
     console.log("useShallowEqualEffect2")
  }, [{ a: { b: 1 } }])

  useDeepEqualEffect(() => {
    // only be called on first render
    console.log("useDeepEqualEffect")
  }, [{ a: { b: 1 } }])
   return (
     <div>
        count: {count}
       <button onClick={() => inc(1)}>+1</button>
     </div>
   )
 }
  return <Example />
`)
