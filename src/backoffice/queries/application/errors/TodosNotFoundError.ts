export class TodosNotFoundError extends Error {
  constructor(msg: string) {
    super(`Unable to fetch Todos due to: ${msg}`)
  }
}
