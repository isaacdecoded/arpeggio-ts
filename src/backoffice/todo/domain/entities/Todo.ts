import { BaseProps, AggregateRoot, DateObject } from '@core/domain/entities'
import { TodoCreatedDomainEvent } from '../events'
import { TodoName } from '../value-objects'

interface Props extends BaseProps {
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

  public static create(props: Props): Todo {
    const todo = new Todo(props)
    todo.addDomainEvent(new TodoCreatedDomainEvent(todo.id))
    return todo
  }

  public static recreate(props: Props & Required<Pick<BaseProps, 'createdAt'>>): Todo {
    return new Todo(props)
  }

  public updateName(name: TodoName) {
    this._name = name
    this._updatedAt = new DateObject(new Date())
  }
}
