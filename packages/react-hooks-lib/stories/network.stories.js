import { storiesOf } from '@storybook/react'

const section = name => `Network|${name}`

storiesOf(section('useOnlineStatus'), module)
  .addLiveSource('demo', `
 const OnlineStatus = () => {
   const { online } = useOnlineStatus()
   return (
     <div>
       <div>{\`online: $\{online}\`}</div>
     </div>
   )
 }
  return <OnlineStatus />
`)

storiesOf(section('useFetch'), module)
  .addLiveSource('get demo', `
 const Fetch = () => {
   const getUrl = text => \`https://api.github.com/search/repositories?q=$\{text}\`
   const { value, bind } = useField('react')
   const { data, loading, setUrl } = useFetch(getUrl('react'))
   return (
     <div>
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
           : (<span>{\`total_count: $\{data.total_count}\`}</span>)
       }
     </div>
   )
 }
  return <Fetch />`)
  .addLiveSource('post demo', `
 const PostFetch = () => {
   const { data, loading, setOptions } = useFetch(
     'https://jsonplaceholder.typicode.com/posts',
     { method: 'POST' },
     { onMount: false },
   )
   return (
     <div>
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
  return <PostFetch />`)
