import { Filter } from '@core/domain/repositories'
import { UseCaseInputPort, UseCaseOutputPort } from '@core/application'
import { TodoRepository } from '../domain/repositories'
import { Todo } from '../domain/entities'
import { TodosNotDeletedError } from '../domain/errors'

export interface DeleteTodoInputData {
  id?: string
}

export interface DeleteTodoOutputData {
  totalDeleted: number
}

export class DeleteTodoUseCase implements UseCaseInputPort<DeleteTodoInputData> {
  constructor(
    private todoRepository: TodoRepository,
    private outputPort: UseCaseOutputPort<DeleteTodoOutputData>,
  ) {}

  public async interact({ id }: DeleteTodoInputData): Promise<void> {
    try {
      const filters: Filter<Todo>[] = []
      if (id) {
        filters.push({ field: 'id', operator: '=', value: id })
      }
      const totalDeleted = await this.todoRepository.delete({ filters })
      return this.outputPort.success({ totalDeleted })
    } catch (e) {
      return this.outputPort.failure(new TodosNotDeletedError(e as string))
    }
  }
}