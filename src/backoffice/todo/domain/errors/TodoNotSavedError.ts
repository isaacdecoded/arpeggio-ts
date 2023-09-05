export class TodoNotSavedError extends Error {
  constructor(msg: string) {
    super(`Unable to save Todo due to: ${msg}`)
  }
}
