import React from "react"
import { configure, setAddon, addDecorator } from '@storybook/react'
import LiveEdit, { setOptions, withLiveEditScope } from 'storybook-addon-react-live-edit'
import * as hooks from "../src/index"


addDecorator(withLiveEditScope({ React, ...hooks }))
setOptions({ 
  theme: 'darcula', 
  presets: ['react'],
})
setAddon(LiveEdit)

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
