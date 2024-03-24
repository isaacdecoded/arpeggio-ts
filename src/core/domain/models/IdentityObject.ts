import { ValueObject } from "./ValueObject"

export class IdentityObject extends ValueObject<string> {
  public toString(): string {
    return `${this.value}`
  }
}
