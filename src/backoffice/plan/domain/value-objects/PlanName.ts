import { ValueObject } from "@core/domain/entities"

export class PlanName extends ValueObject<string> {
  constructor(value: string) {
    const MAX_LENGTH = 500
    if (value.length > MAX_LENGTH) {
      throw new Error(
        `The name exceeds the maximum length of ${MAX_LENGTH} characters.`
      )
    }
    super(value)
  }
}
