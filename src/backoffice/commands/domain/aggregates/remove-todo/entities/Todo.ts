import { EntityProps, AggregateRoot, DateObject } from "@core/domain/entities"
import { TodoStatus, TodoStatuses } from "../value-objects"

interface Props extends EntityProps {
  status: TodoStatus
}

export class Todo extends AggregateRoot {
  private _status: TodoStatus

  private constructor(props: Props) {
    super(props)
    this._status = props.status
  }

  get status() {
    return this._status
  }

  public static recreate(
    props: Props & Required<Pick<EntityProps, "createdAt">>
  ): Todo {
    return new Todo(props)
  }

  public remove() {
    this._status = new TodoStatus(TodoStatuses.REMOVED)
    this._updatedAt = new DateObject(new Date())
  }
}
