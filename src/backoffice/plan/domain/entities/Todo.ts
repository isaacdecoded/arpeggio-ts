import { EntityProps, Entity } from "@core/domain/models"
import { TodoDescription } from "../value-objects"
import { TodoStatus } from "../enums"

interface Props extends EntityProps {
  description: TodoDescription
  status: TodoStatus
}

export class Todo extends Entity {
  private _description: TodoDescription
  private _status: TodoStatus

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

  public changeDescription(description: TodoDescription) {
    this._description = description
    this.update()
  }

  public changeStatus(status: TodoStatus) {
    this._status = status
    this.update()
  }
}
