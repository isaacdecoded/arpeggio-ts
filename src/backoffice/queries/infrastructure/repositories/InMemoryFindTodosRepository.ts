import { FindTodosRepository } from "../../domain/repositories"
import {
  FindTodosReadCriteria,
  FindTodosReadModel,
} from "../../application/use-cases"

interface TodoModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryFindTodosRepository
  implements FindTodosRepository<FindTodosReadCriteria, FindTodosReadModel[]>
{
  private todos: Map<string | number, TodoModel> = new Map()

  constructor() {
    this.todos.set("MySecondTodoID", {
      name: "My Second Todo",
      createdAt: new Date(),
    })
  }

  async find(criteria?: FindTodosReadCriteria): Promise<FindTodosReadModel[]> {
    if (criteria) {
      // TODO: implement Criteria behaviors
    }
    const todos: FindTodosReadModel[] = []
    this.todos.forEach((value, key) => {
      todos.push({
        id: key.toString(),
        name: value.name,
        createdAt: value.createdAt,
      })
    })
    return todos
  }
}
