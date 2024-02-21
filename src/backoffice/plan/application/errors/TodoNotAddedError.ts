export class TodoNotAddedError extends Error {
  constructor(msg: string) {
    super(`Unable to add Todo due to: ${msg}`)
  }
}
