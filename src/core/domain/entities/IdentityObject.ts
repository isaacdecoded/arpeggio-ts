export class IdentityObject {
  private _value: string

  constructor(value: string) {
    if (value === '') {
      throw new Error('Attribute "value" of IdentityObject cannot be empty or blank.')
    }
    this._value = value
  }

  get value() {
    return this._value
  }

  public isEqual(identity: IdentityObject) {
    this.value === identity.value
  }
}
