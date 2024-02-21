export class PlanNotFoundError extends Error {
  constructor(msg: string) {
    super(`Unable to fetch Plan due to: ${msg}`)
  }
}
