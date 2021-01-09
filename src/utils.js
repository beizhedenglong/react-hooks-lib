export const isNil = x => x == null


export const cancelablePromise = /* istanbul ignore next */ (promise) => {
  let hasCanceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)))
    promise.catch(error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)))
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true
    },
  }
}


const hasOwn = /* istanbul ignore next */ Object.prototype.hasOwnProperty

const is = /* istanbul ignore next */ (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  }
  return x !== x && y !== y // eslint-disable-line
}


export const shallowEqual = /* istanbul ignore next */ (objA, objB) => {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null
    || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) { //eslint-disable-line
    if (!hasOwn.call(objB, keysA[i])
      || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}


export const identity = x => x

export const toPath = (x = '') => {
  if (Array.isArray(x)) {
    return x
  }
  return x.toString().replace(/[[\]]/g, '.').split('.').reduce((acc, item) => {
    if (item.trim() !== '') {
      acc.push(item)
    }
    return acc
  }, [])
}

export const get = (obj, pathString, defaultValue) => {
  const path = toPath(pathString)
  const res = path.reduce((acc, key) => {
    if (isNil(acc)) {
      return undefined
    }
    return acc[key]
  }, obj)
  return isNil(res) ? defaultValue : res
}

export const isPlainObject = value => Object.prototype.toString.call(value) === '[object Object]'


const copyCurrentValue = (obj, nextKey) => {
  if (Array.isArray(obj)) {
    return [
      ...obj,
    ]
  } if (isPlainObject(obj)) {
    return { ...obj }
  }
  if (/[0-9]+/.test(nextKey) && parseInt(nextKey, 10).toString() === nextKey.toString()) {
    return []
  }
  return {}
}
export const set = (obj, pathString, value) => {
  const path = toPath(pathString)
  if (path.length === 0) {
    return value
  }

  const result = copyCurrentValue(obj, path[0])

  path.reduce((acc, currentKey, index) => {
    const hasNext = index !== path.length - 1
    const nextKey = path[index + 1]
    if (hasNext) {
      acc[currentKey] = copyCurrentValue(acc[currentKey], nextKey)
    } else {
      acc[currentKey] = value
    }
    return acc[currentKey]
  }, result)
  return result
}
