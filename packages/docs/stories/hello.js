import React from "react"
import {Source, Preview, Story, Canvas} from "@storybook/addon-docs/blocks"

import test from '!!raw-loader!./Button';
import {Button} from "./Button"
// TODO webpack fileinfo loader
export default () => <>

  <Preview withSource={{code: test, language: "jsx"}}>
    <Button label="hello"></Button>
  </Preview>
  {/* <Source code={test}></Source> */}
</>