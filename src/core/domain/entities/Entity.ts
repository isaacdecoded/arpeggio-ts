import { IdentityObject } from './IdentityObject'
import { DateObject } from './DateObject'
import { InvalidArgumentError } from '../errors'

export interface BaseProps {
  id: IdentityObject
  createdAt?: DateObject
  updatedAt?: DateObject
}

export abstract class Entity {
  private _id: IdentityObject
  private _createdAt: DateObject
  protected _updatedAt?: DateObject

  constructor(props: BaseProps) {
    this._id = props.id
    this._createdAt = props.createdAt
      ? props.createdAt
      : new DateObject(new Date())
    if (props.updatedAt) {
      this.validateDatesRange(props.updatedAt)
      this._updatedAt = props.updatedAt
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

  private validateDatesRange(updatedAt: DateObject) {
    if (updatedAt.value < this._createdAt.value) {
      throw new InvalidArgumentError(
        `The updatedAt date should not be previous to createdAt date.`,
      )
    }
  }
}
