export const isNil = x => x == null

export const cancelablePromise = (promise) => {
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
