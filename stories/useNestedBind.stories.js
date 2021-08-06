import { storiesOf } from '@storybook/react'

const section = name => `State|${name}`


storiesOf(section('useNestedBind'), module)
  .addLiveSource('basic', `
    const Basic = () => {
      const { bindPath, state } = useNestedBind({
        name: 'Victor',
        age: 100,
        checkbox: false,
        selected: ['grapefruit', 'lime'],
      })


      return (
        <div>
          <div style={{
            display: 'flex', flexDirection: 'column', padding: '20px', height: '150px', justifyContent: 'space-around',
          }}
          >
            State:
            {' '}
            {JSON.stringify(state, null, 2)}
            <div>
              <input type="text" {...bindPath('name')} />
            </div>
            <div>

              <input type="checkbox" {...bindPath('checkbox', { propName: 'checked' })} />
            </div>
            <div>
              <select multiple {...bindPath('selected')}>
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
