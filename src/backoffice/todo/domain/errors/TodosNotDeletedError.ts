export class TodosNotDeletedError extends Error {
  constructor(msg: string) {
    super(`Unable to delete Todos due to: ${msg}`)
  }
}
