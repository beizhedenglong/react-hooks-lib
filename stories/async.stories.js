import { storiesOf } from '@storybook/react'

const section = name => `Async|${name}`


storiesOf(section('useAsync'), module)
  .addLiveSource('demo', `
  const wait = time => new Promise(res => setTimeout(() => res(), time))

  const AsyncButton = (props) => {
    const { f, loading } = useAsync(props.onClick)
    return (
      <button onClick={f} disabled={loading}>
        {loading ? 'Loading...' : props.children}
      </button>
    )
  }
  return <AsyncButton onClick={() => wait(1000)}>Async Click</AsyncButton>
 `)
