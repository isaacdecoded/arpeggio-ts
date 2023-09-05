import { IdentityObject } from '@core/domain/entities'
import { UseCaseInputPort, UseCaseOutputPort } from '@core/application'
import { TodoName } from '../domain/value-objects'
import { TodoNotSavedError } from '../domain/errors'
import { TodoRepository } from '../domain/repositories'

export interface UpdateTodoInputData {
  id: string
  name: string
}

export interface UpdateTodoOutputData {
  id: IdentityObject
}

export class UpdateTodoUseCase implements UseCaseInputPort<UpdateTodoInputData> {
  constructor(
    private todoRepository: TodoRepository,
    private outputPort: UseCaseOutputPort<UpdateTodoOutputData>,
    ) {}

  public async interact({ id, name }: UpdateTodoInputData): Promise<void> {
    try {
      const todoId = new IdentityObject(id)
      const todo = await this.todoRepository.getById(todoId)
      if (todo) {
        todo.updateName(new TodoName(name))
        await this.todoRepository.save(todo)
      }
      return this.outputPort.success({ id: todoId })
    } catch (e) {
      return this.outputPort.failure(new TodoNotSavedError(e as string))
    }
  }
}