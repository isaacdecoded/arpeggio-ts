import { IdentityObject } from "@core/domain/entities"
import { DomainEventBus } from "@core/domain/events"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { Todo } from "../../domain/aggregates/create-todo/entities"
import { TodoName } from "../../domain/aggregates/create-todo/value-objects"
import { TodoNotCreatedError } from "../errors"
import { CreateTodoRepository } from "../../domain/aggregates/create-todo/repositories"

interface RequestModel {
  name: string
}

export interface CreateTodoResponseModel {
  id: IdentityObject
}

export class CreateTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private todoRepository: CreateTodoRepository,
    private outputPort: UseCaseOutputPort<CreateTodoResponseModel>,
    private domainEventBus: DomainEventBus
  ) {}

  public async interact(requestModel: RequestModel): Promise<void> {
    try {
      const id = await this.todoRepository.generateId()
      const todo = Todo.create({
        id,
        name: new TodoName(requestModel.name),
      })
      await this.todoRepository.save(todo)
      await this.domainEventBus.publish(todo.pullDomainEvents())
      return this.outputPort.success({ id })
    } catch (e) {
      return this.outputPort.failure(new TodoNotCreatedError(e as string))
    }
  }
}
