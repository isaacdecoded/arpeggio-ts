import { IdentityObject, DateObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"
import { Todo } from "../../domain/aggregates/remove-todo/entities"
import {
  TodoStatus,
  TodoStatuses,
} from "../../../commands/domain/aggregates/remove-todo/value-objects"
import { RemoveTodoRepository } from "../../domain/aggregates/remove-todo/repositories"

interface TodoModel {
  status: TodoStatuses
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryRemoveTodoRepository implements RemoveTodoRepository {
  private todos: Map<string | number, TodoModel> = new Map()

  constructor() {
    this.todos.set("MyFirstTodoID", {
      status: TodoStatuses.ARCHIVED,
      createdAt: new Date(),
    })
  }

  async getById(id: IdentityObject): Promise<Nullable<Todo>> {
    const todoModel = this.todos.get(id.value)
    return todoModel ? this.toEntity(id.value, todoModel) : todoModel
  }

  async save(entity: Todo): Promise<void> {
    const todo = this.todos.get(entity.id.value)
    if (todo) {
      todo.status = entity.status.value
      this.todos.set(entity.id.value, todo)
    }
  }

  private toEntity(id: string | number, model: TodoModel): Todo {
    return Todo.recreate({
      id: new IdentityObject(id),
      status: new TodoStatus(model.status),
      createdAt: new DateObject(model.createdAt),
      updatedAt: model.updatedAt ? new DateObject(model.updatedAt) : undefined,
    })
  }
}
