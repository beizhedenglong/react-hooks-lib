import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {
  render, fireEvent,
} from 'react-testing-library'
import {
  useTouch, useHover, useFocus, useActive,
} from '../src/index'


test('useTouch', () => {
  const Touch = () => {
    const { touched, bind } = useTouch()
    return <div {...bind}>{`${touched}`}</div>
  }
  const { container } = render(<Touch />)
  expect(container.firstChild.textContent).toBe('false')
  fireEvent.touchStart(container.firstChild)
  expect(container.firstChild.textContent).toBe('true')
  fireEvent.touchEnd(container.firstChild)
  expect(container.firstChild.textContent).toBe('false')
})

test('useHover', () => {
  const Hover = () => {
    const { hovered, bind } = useHover()
    return (
      <div {...bind}>{String(hovered)}</div>
    )
  }
  const { container } = render(<Hover />)
  expect(container.firstChild.textContent).toBe('false')
  fireEvent.mouseEnter(container.firstChild)
  expect(container.firstChild.textContent).toBe('true')
  fireEvent.mouseLeave(container.firstChild)
  expect(container.firstChild.textContent).toBe('false')
})

test('useFocus', () => {
  const Focus = () => {
    const { focused, bind } = useFocus()
    return (
      <div>
        <span>{String(focused)}</span>
        <input type="text" {...bind} />
      </div>
    )
  }
  const { container } = render(<Focus />)
  expect(container.firstChild.firstChild.textContent).toBe('false')
  fireEvent.focus(container.firstChild.lastChild)
  expect(container.firstChild.firstChild.textContent).toBe('true')
  fireEvent.blur(container.firstChild.lastChild)
  expect(container.firstChild.firstChild.textContent).toBe('false')
})

test('useActive', () => {
  const Active = () => {
    const { active, bind } = useActive()
    return <div {...bind}>{String(active)}</div>
  }
  const { container } = render(<Active />)
  expect(container.firstChild.textContent).toBe('false')
  fireEvent.mouseDown(container.firstChild)
  expect(container.firstChild.textContent).toBe('true')
  fireEvent.mouseUp(container.firstChild)
  expect(container.firstChild.textContent).toBe('false')
})
