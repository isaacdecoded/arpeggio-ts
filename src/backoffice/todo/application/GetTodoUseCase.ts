import { IdentityObject } from '@core/domain/entities'
import { UseCaseInputPort, UseCaseOutputPort } from '@core/application'
import { Todo } from '../domain/entities'
import { TodoNotFoundError } from '../domain/errors'
import { TodoRepository } from '../domain/repositories'

export interface GetTodoInputData {
  id: string
}

export interface GetTodoOutputData {
  todo: Todo
}

export class GetTodoUseCase implements UseCaseInputPort<GetTodoInputData> {
  constructor(
    private todoRepository: TodoRepository,
    private outputPort: UseCaseOutputPort<GetTodoOutputData>,
  ) {}

  public async interact({ id }: GetTodoInputData): Promise<void> {
    try {
      const todo = await this.todoRepository.getById(
        new IdentityObject(id),
      )
      if (!todo) {
        return this.outputPort.failure(new TodoNotFoundError(id))
      }
      return this.outputPort.success({ todo })
    } catch (e) {
      return this.outputPort.failure(new TodoNotFoundError(id, e as string))
    }
  }
}