import { storiesOf } from '@storybook/react'

const section = name => `State|${name}`


storiesOf(section('useBind'), module)
  .addLiveSource('basic', `
  const Basic = () => {
    const input = useBind('Victor')
    const checkbox = useBind(false, { propName: 'checked' })
    const select = useBind('grapefruit')
    const multiSelect = useBind(['grapefruit', 'lime'])
    return (
      <div>
        <div style={{
          display: 'flex', flexDirection: 'column', height: '200px', justifyContent: 'space-around',
        }}
        >
          <div>
            Input Value:
            {input.value}
            <input type="text" {...input.bind} />
          </div>
          <div>
            Checkbox Value:
            {\`$\{checkbox.value}\`}
            <input type="checkbox" {...checkbox.bind} />
          </div>
          <div>
            Select Value:
            {select.value}
            <select {...select.bind}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </div>
          <div>
            MultiSelect Value:
            {multiSelect.value.join(',')}
            <select multiple {...multiSelect.bind}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  return <Basic />
 `)
  .addLiveSource('with custom component', `
    const NameInput = ({ name, onInput }) => (
      <label>
        Name:
        {' '}
        <input type="text" value={name} onChange={onInput} />
      </label>
    )

    const WithCustomComponent = () => {
      const name = useBind('Victor', { propName: 'name', handlerName: 'onInput' })
      return <NameInput {...name.bind} />
    }

    return <WithCustomComponent />
  `)
