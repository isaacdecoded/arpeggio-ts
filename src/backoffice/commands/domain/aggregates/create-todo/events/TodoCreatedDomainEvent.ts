import { DomainEvent } from "@core/domain/events"
import { Todo } from "../entities"

export class TodoCreatedDomainEvent extends DomainEvent {
  private readonly _todoName: string
  private readonly _todoCreatedAt: Date

  constructor(todo: Todo) {
    super("TodoCreated", todo.id.value)
    this._todoName = todo.name.value
    this._todoCreatedAt = todo.createdAt.value
  }

  get todoName() {
    return this._todoName
  }

  get todoCreatedAt() {
    return this._todoCreatedAt
  }
}
