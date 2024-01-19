import { IdentityObject } from "@core/domain/entities"
import { Todo } from "../../domain/aggregates/create-todo/entities"
import { CreateTodoRepository } from "../../domain/aggregates/create-todo/repositories"

interface TodoModel {
  name: string
  createdAt: Date
}

export class InMemoryCreateTodoRepository implements CreateTodoRepository {
  private todos: Map<string | number, TodoModel> = new Map()

  async generateId(): Promise<IdentityObject> {
    return new IdentityObject("MyFirstTodoID")
  }

  async save(entity: Todo): Promise<void> {
    this.todos.set(entity.id.value, this.toModel(entity))
  }

  private toModel(entity: Todo): TodoModel {
    return {
      name: entity.name.value,
      createdAt: entity.createdAt.value,
    }
  }
}
