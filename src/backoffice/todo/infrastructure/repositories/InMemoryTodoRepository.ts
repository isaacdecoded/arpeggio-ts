import { IdentityObject, DateObject } from '@core/domain/entities'
import { Criteria } from '@core/domain/repositories'
import { Todo } from '../../domain/entities'
import { TodoName } from '../../domain/value-objects'
import { TodoRepository } from '../../domain/repositories'

interface TodoModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Map<string | number, TodoModel> = new Map()

  async generateId(): Promise<string> {
    return 'MyFirstTodoID'
  }

  async find(criteria?: Criteria<Todo>): Promise<Todo[]> {
    // TODO: implement Criteria behaviors
    const todos: Todo[] = []
    this.todos.forEach((value, key) => {
      todos.push(this.toEntity(key, {
        name: value.name,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      }))
    })
    return todos
  }

  async getById(id: IdentityObject): Promise<Todo|undefined> {
    const todoModel = this.todos.get(id.value)
    return todoModel
      ? this.toEntity(id.value, todoModel)
      : todoModel
  }

  async save(entity: Todo): Promise<void> {
    this.todos.set(entity.id.value, this.toModel(entity))
  }

  async delete(criteria?: Criteria<Todo>): Promise<number> {
    // TODO: implement Criteria behaviors
    const totalDeleted = this.todos.size
    this.todos.clear()
    return totalDeleted
  }

  private toEntity(id: string | number, model: TodoModel): Todo {
    return Todo.recreate({
      id: new IdentityObject(id),
      name: new TodoName(model.name),
      createdAt: new DateObject(model.createdAt),
      updatedAt: model.updatedAt ? new DateObject(model.updatedAt) : undefined,
    })
  }

  private toModel(entity: Todo): TodoModel {
    return {
      name: entity.name.value,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt?.value,
    }
  }
}
