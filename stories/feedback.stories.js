import { storiesOf } from '@storybook/react'

const section = name => `Feedback|${name}`

storiesOf(section('useHover'), module)
  .addLiveSource('demo', `
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
  return <Hover />
`)

storiesOf(section('useActive'), module)
  .addLiveSource('demo', `
 const Active = () => {
   const { active, bind } = useActive()
   return (
     <div>
       <div {...bind}>
         active:
         {String(active)}
       </div>
     </div>
   )
 }
  return <Active />
`)

storiesOf(section('useFocus'), module)
  .addLiveSource('demo', `
 const Focus = () => {
   const { focused, bind } = useFocus()
   return (
     <div>
       focused:
       {String(focused)}
       <input type="text" {...bind} />
     </div>
   )
 }
  return <Focus />
`)

storiesOf(section('useTouch'), module)
  .addLiveSource('demo', `
 const Touch = () => {
   const { touched, bind } = useTouch()
   return (
     <div>
       <div {...bind}>{\`touched: $\{touched}\`}</div>
     </div>
   )
 }
  return <Touch />
`)
