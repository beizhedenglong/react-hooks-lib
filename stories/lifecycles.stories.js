import { storiesOf } from '@storybook/react'

const section = name => `Lifecycles|${name}`

storiesOf(section('lifecycles'), module)
  .addLiveSource('demo', `
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
   return \`count: $\{count}\`
 }
 const LifecycleExample = () => {
   const { count, inc } = useCounter(0)
   const counter2 = useCounter(2)
   return (
     <div>
       {
         count <= 3
           ? <Lifecycle count={count} count2={counter2.count} />
           : 'count > 3, component did unmount'
       }

       <button onClick={() => inc(1)}>+1</button>
     </div>
   )
 }
  return <LifecycleExample />
`)
