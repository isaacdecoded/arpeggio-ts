import { IdentityObject } from './IdentityObject'

export type Base = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export abstract class Entity {
  private readonly _id?: IdentityObject
  private _createdAt: Date
  protected _updatedAt?: Date

  constructor(base: Base) {
    if (base.id) {
      this._id = new IdentityObject(base.id)
    }
    this._createdAt = base.createdAt
      ? new Date(base.createdAt)
      : new Date()
    if (base.updatedAt) {
      this._updatedAt = new Date(base.updatedAt)
    }
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return new Date(this._createdAt)
  }

  get updatedAt() {
    if (this._updatedAt) {
      return new Date(this._updatedAt)
    }
  }
}
