export class PlanNotCreatedError extends Error {
  constructor(msg: string) {
    super(`Unable to create Plan due to: ${msg}`)
  }
}
