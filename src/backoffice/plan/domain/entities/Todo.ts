import { EntityProps, Entity } from "@core/domain/models"
import { TodoDescription } from "../value-objects"

interface Props extends EntityProps {
  description: TodoDescription
  status: TodoStatuses
}

export enum TodoStatuses {
  PENDING = "PENDING",
  DONE = "DONE",
  REMOVED = "REMOVED",
}

export class Todo extends Entity {
  private _description: TodoDescription
  private _status: TodoStatuses

  constructor(props: Props) {
    super(props)
    this._description = props.description
    this._status = props.status
  }

  get description() {
    return this._description
  }

  get status() {
    return this._status
  }

  public setDescription(description: TodoDescription) {
    this._description = description
    this.update()
  }

  public setStatus(status: TodoStatuses) {
    this._status = status
    this.update()
  }
}
