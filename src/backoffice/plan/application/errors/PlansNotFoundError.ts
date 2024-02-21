export class PlansNotFoundError extends Error {
  constructor(msg: string) {
    super(`Unable to fetch Plans due to: ${msg}`)
  }
}
