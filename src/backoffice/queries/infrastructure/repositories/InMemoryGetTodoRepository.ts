import { IdentityObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"
import { GetTodoRepository } from "../../domain/repositories"
import { GetTodoReadModel } from "../../application/use-cases"

interface TodoModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryGetTodoRepository
  implements GetTodoRepository<GetTodoReadModel>
{
  private todos: Map<string | number, TodoModel> = new Map()

  constructor() {
    this.todos.set("MyFirstTodoID", {
      name: "My First Todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async getById(id: IdentityObject): Promise<Nullable<GetTodoReadModel>> {
    const todoModel = this.todos.get(id.value)
    return todoModel
      ? {
          name: todoModel.name,
          createdAt: todoModel.createdAt,
          updatedAt: todoModel.updatedAt,
        }
      : todoModel
  }
}
