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
