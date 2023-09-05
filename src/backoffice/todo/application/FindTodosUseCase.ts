import { Criteria } from '@core/domain/repositories'
import { UseCaseInputPort, UseCaseOutputPort } from '@core/application'
import { Todo } from '../domain/entities'
import { TodosNotFoundError } from '../domain/errors'
import { TodoRepository } from '../domain/repositories'

export interface FindTodosInputData {
  name?: string
  offset: number
  limit: number
}

export interface FindTodosOutputData {
  todos: Todo[]
}

export class FindTodosUseCase implements UseCaseInputPort<FindTodosInputData> {
  constructor(
    private todoRepository: TodoRepository,
    private outputPort: UseCaseOutputPort<FindTodosOutputData>,
  ) {}

  public async interact({ name, offset, limit }: FindTodosInputData): Promise<void> {
    try {
      const criteria: Criteria<Todo> = {
        filters: [],
        limit,
        offset,
        selection: ['id', 'name'],
        sort: { field: 'createdAt', order: 'desc' },
      }
      if (name) {
        criteria.filters.push({ field: 'name', operator: 'contains', value: name })
      }
      const todos = await this.todoRepository.find(criteria)
      return this.outputPort.success({ todos })
    } catch (e) {
      return this.outputPort.failure(new TodosNotFoundError(e as string))
    }
  }
}