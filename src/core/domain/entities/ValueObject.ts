type Primitives = string | number | boolean | Date

export class ValueObject<T extends Primitives> {
  readonly value: T

  constructor(value: T) {
    this.value = value
  }

  public isEqual(o: ValueObject<T>): boolean {
    return this.value === o.value
  }

  toString() {
    if (this.value) {
      return this.value.toString()
    }
    return this.value
  }
}
