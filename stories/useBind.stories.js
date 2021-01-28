import { storiesOf } from '@storybook/react'

const section = name => `State|${name}`


storiesOf(section('useBind'), module)
  .addLiveSource('demo', `
  const UseBind = () => {
    const input = useBind(
      'Victor',
      { map: e => e.target.value },
    )
    const checkbox = useBind(
      true,
      { propName: 'checked', map: e => e.target.checked },
    )
    return (
      <div>
        <div>
          Input value:
          {' '}
          {input.value}
          <input type="text" {...input.bind} />
        </div>
        <div>
          Checkbox value:
          {' '}
          {(checkbox.value.toString())}
          <input type="checkbox" {...checkbox.bind} />
        </div>
      </div>
    )
  }
  return <UseBind />
 `)
