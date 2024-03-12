import { ValueObject } from "./ValueObject"

export class IdentityObject extends ValueObject<string | number> {
  public toString(): string {
    return `${this.value}`
  }
}
