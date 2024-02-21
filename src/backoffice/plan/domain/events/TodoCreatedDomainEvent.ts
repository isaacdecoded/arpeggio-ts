import { DomainEvent } from "@core/domain/events"
import { Todo } from "../entities"

export class TodoCreatedDomainEvent extends DomainEvent {
  private readonly _todoDescription: string
  private readonly _todoCreatedAt: Date

  constructor(todo: Todo) {
    super(TodoCreatedDomainEvent.name, todo.id.value)
    this._todoDescription = todo.description.value
    this._todoCreatedAt = todo.createdAt.value
  }

  get todoDescription() {
    return this._todoDescription
  }

  get todoCreatedAt() {
    return this._todoCreatedAt
  }
}
