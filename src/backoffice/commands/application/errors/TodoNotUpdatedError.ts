export class TodoNotUpdatedError extends Error {
  constructor(msg: string) {
    super(`Unable to update Todo due to: ${msg}`)
  }
}
