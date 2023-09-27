export class ValueObject<T> {
  readonly value: T

  constructor(value: T) {
    this.value = value
  }

  public isEqual(o: ValueObject<T>): boolean {
    return this.value === o.value
  }

}
