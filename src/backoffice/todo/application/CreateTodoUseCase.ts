import { IdentityObject } from '@core/domain/entities'
import { DomainEventBus } from '@core/domain/events'
import { UseCaseInputPort, UseCaseOutputPort } from '@core/application'
import { Todo } from '../domain/entities'
import { TodoName } from '../domain/value-objects'
import { TodoNotSavedError } from '../domain/errors'
import { TodoRepository } from '../domain/repositories'

export interface CreateTodoInputData {
  name: string
}

export interface CreateTodoOutputData {
  id: IdentityObject
}

export class CreateTodoUseCase implements UseCaseInputPort<CreateTodoInputData> {
  constructor(
    private todoRepository: TodoRepository,
    private outputPort: UseCaseOutputPort<CreateTodoOutputData>,
    private domainEventBus: DomainEventBus,
  ) {}

  public async interact(inputData: CreateTodoInputData): Promise<void> {
    try {
      const repositoryId = await this.todoRepository.generateId()
      const id = new IdentityObject(repositoryId)
      const todo = Todo.create({
          id,
          name: new TodoName(inputData.name),
      })
      await this.todoRepository.save(todo)
      await this.domainEventBus.publish(todo.pullDomainEvents())
      return this.outputPort.success({ id })
    } catch (e) {
      return this.outputPort.failure(new TodoNotSavedError(e as string))
    }
  }
}