import { ValueObject } from "@core/domain/models"

export class TodoDescription extends ValueObject<string> {
  constructor(value: string) {
    const MAX_LENGTH = 1200
    if (value.length > MAX_LENGTH) {
      throw new Error(
        `The name exceeds the maximum length of ${MAX_LENGTH} characters.`,
      )
    }
    super(value)
  }
}
