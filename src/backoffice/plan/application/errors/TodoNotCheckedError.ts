export class TodoNotCheckedError extends Error {
  constructor(msg: string) {
    super(`Unable to check Todo due to: ${msg}`)
  }
}
