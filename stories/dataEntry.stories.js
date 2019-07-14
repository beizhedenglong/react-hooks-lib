import { storiesOf } from '@storybook/react'

const section = name => `Data Entry|${name}`

storiesOf(section('useField'), module)
  .addLiveSource('demo', `
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
  return (
    <div>
      <Input />
      <Select />
    </div>
  )
  
`)
