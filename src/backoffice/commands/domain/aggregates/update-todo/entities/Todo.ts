import { EntityProps, AggregateRoot, DateObject } from "@core/domain/entities"
import { TodoName } from "../value-objects"

interface Props extends EntityProps {
  name: TodoName
}

export class Todo extends AggregateRoot {
  private _name: TodoName

  private constructor(props: Props) {
    super(props)
    this._name = props.name
  }

  get name() {
    return this._name
  }

  public static recreate(
    props: Props & Required<Pick<EntityProps, "createdAt">>
  ): Todo {
    return new Todo(props)
  }

  public updateName(name: TodoName) {
    this._name = name
    this._updatedAt = new DateObject(new Date())
  }
}
