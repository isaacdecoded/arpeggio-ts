export class TodoNotRemovedError extends Error {
  constructor(msg: string) {
    super(`Unable to remove Todo due to: ${msg}`)
  }
}
