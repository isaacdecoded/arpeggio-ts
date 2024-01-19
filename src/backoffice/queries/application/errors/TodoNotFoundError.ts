export class TodoNotFoundError extends Error {
  constructor(id: string, msg?: string) {
    super(`Todo with id <${id}> ${msg ? `not found due to: ${msg}` : 'do not exist.'}`)
  }
}
