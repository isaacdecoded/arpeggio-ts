import { ValueObject } from "./ValueObject"

export interface EntityProps<Id extends ValueObject<string>> {
  id: Id
  createdAt: ValueObject<Date>
  updatedAt?: ValueObject<Date>
}

export abstract class Entity<Id extends ValueObject<string>> {
  private _id: Id
  private _createdAt: ValueObject<Date>
  private _updatedAt?: ValueObject<Date>
  constructor(props: EntityProps<Id>) {
    this._id = props.id
    this._createdAt = props.createdAt
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

  /**
   * Updates the "updateAt" property with current date.
   */
  protected update(updatedAt: ValueObject<Date>) {
    this._updatedAt = updatedAt
  }

  private validateDatesRange(updatedAt: ValueObject<Date>) {
    if (updatedAt.value < this._createdAt.value) {
      throw new Error(`The updatedAt date must be later than createdAt date.`)
    }
  }
}
