import { IdentityObject, DateObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"
import { Todo } from "../../domain/aggregates/update-todo/entities"
import { TodoName } from "../../domain/aggregates/create-todo/value-objects"
import { UpdateTodoRepository } from "../../domain/aggregates/update-todo/repositories"

interface TodoModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryUpdateTodoRepository implements UpdateTodoRepository {
  private todos: Map<string | number, TodoModel> = new Map()

  constructor() {
    this.todos.set("MyFirstTodoID", {
      name: "My First Todo",
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
      todo.name = entity.name.value
      this.todos.set(entity.id.value, todo)
    }
  }

  private toEntity(id: string | number, model: TodoModel): Todo {
    return Todo.recreate({
      id: new IdentityObject(id),
      name: new TodoName(model.name),
      createdAt: new DateObject(model.createdAt),
      updatedAt: model.updatedAt ? new DateObject(model.updatedAt) : undefined,
    })
  }
}
