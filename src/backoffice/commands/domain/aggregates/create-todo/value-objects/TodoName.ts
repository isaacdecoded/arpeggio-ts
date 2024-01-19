import { ValueObject } from '@core/domain/entities'
import { InvalidArgumentError } from '@core/domain/errors'

export class TodoName extends ValueObject<string> {
  constructor(value: string) {
    if (value.length > 500) {
      throw new InvalidArgumentError(
        `The name exceeds the maximum length of 500 characters.`
      )
    }
    super(value)
  }
}