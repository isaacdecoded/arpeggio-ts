import { ValueObject } from './ValueObject'

export type Base = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export abstract class Entity {
  private readonly _id?: ValueObject<string>
  private _createdAt: ValueObject<Date>
  protected _updatedAt?: ValueObject<Date>

  constructor(base: Base) {
    if (base.id) {
      this._id = new ValueObject(base.id)
    }
    this._createdAt = base.createdAt
      ? new ValueObject(base.createdAt)
      : new ValueObject(new Date())
    if (base.updatedAt) {
      this._updatedAt = new ValueObject(base.updatedAt)
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
