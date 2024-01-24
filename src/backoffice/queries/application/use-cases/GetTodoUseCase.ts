import { IdentityObject } from "@core/domain/entities"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { TodoNotFoundError } from "../errors"
import { GetTodoRepository } from "../../domain/repositories"

export interface GetTodoRequestModel {
  id: string
}

export interface GetTodoReadModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

export interface GetTodoResponseModel {
  todo: GetTodoReadModel
}

export class GetTodoUseCase implements UseCaseInputPort<GetTodoRequestModel> {
  constructor(
    private todoRepository: GetTodoRepository<GetTodoReadModel>,
    private outputPort: UseCaseOutputPort<GetTodoResponseModel>
  ) {}

  public async interact({ id }: GetTodoRequestModel): Promise<void> {
    try {
      const todo = await this.todoRepository.getById(new IdentityObject(id))
      if (!todo) {
        return this.outputPort.failure(new TodoNotFoundError(id))
      }
      return this.outputPort.success({ todo })
    } catch (e) {
      return this.outputPort.failure(new TodoNotFoundError(id, e as string))
    }
  }
}
