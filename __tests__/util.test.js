
import {
  isNil, toPath, get, set,
} from '../src/utils'

test('isNil', () => {
  expect(isNil(2)).toBe(false)
})


test('toPath', () => {
  expect(toPath('a.b.c')).toEqual(['a', 'b', 'c'])
  expect(toPath('a[0].b.c')).toEqual(['a', '0', 'b', 'c'])
  expect(toPath('')).toEqual([])
  expect(toPath([])).toEqual([])
  expect(toPath(123)).toEqual(['123'])
})


test('get', () => {
  const obj = { a: [{ b: { c: 3 } }] }

  expect(get(obj, 'a[0].b.c')).toEqual(3)
  expect(get(obj, ['a', '0', 'b', 'c'])).toEqual(3)
  expect(get(obj, 'a.b.c', 'default')).toEqual('default')
  expect(get(obj)).toEqual(obj)
  expect(get(obj, '')).toEqual(obj)
  expect(get(obj, [])).toEqual(obj)
})

test('set', () => {
  const obj = { a: [{ b: { c: 3 } }] }

  expect(set(obj, 'a[0].b.c', 4)).toEqual({ a: [{ b: { c: 4 } }] })
  expect(set(obj, ['a', '0', 'b', 'c'], 4)).toEqual({ a: [{ b: { c: 4 } }] })
  // TODO
  expect(set(obj, 'a.b.c', 'default').a.b.c).toEqual('default')
  expect(set(obj, [], 3)).toEqual(3)
  expect(set(obj, [], 3)).toEqual(3)
  expect(set(obj, [])).toEqual(undefined)
  expect(obj).toEqual({ a: [{ b: { c: 3 } }] })
  expect(set(2, 'a.b.c', 3)).toEqual({ a: { b: { c: 3 } } })
})
