import { ValueObject } from './ValueObject'

export type Base = {
  id: ValueObject<string>
  createdAt?: ValueObject<Date>
  updatedAt?: ValueObject<Date>
}

export abstract class Entity {
  private _id: ValueObject<string>
  private _createdAt: ValueObject<Date>
  protected _updatedAt?: ValueObject<Date>

  constructor(base: Base) {
    this._id = base.id
    this._createdAt = base.createdAt
      ? base.createdAt
      : new ValueObject(new Date())
    if (base.updatedAt) {
      this._updatedAt = base.updatedAt
    }
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    if (this._updatedAt) {
      return this._updatedAt
    }
  }
}
