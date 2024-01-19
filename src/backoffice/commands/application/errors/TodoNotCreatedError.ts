export class TodoNotCreatedError extends Error {
  constructor(msg: string) {
    super(`Unable to create Todo due to: ${msg}`)
  }
}
