import { IdentityObject } from "@core/domain/entities"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { TodoName } from "../../domain/aggregates/create-todo/value-objects"
import { TodoNotUpdatedError } from "../errors"
import { UpdateTodoRepository } from "../../domain/aggregates/update-todo/repositories"

interface RequestModel {
  id: string
  name: string
}

export interface UpdateTodoResponseModel {
  id: IdentityObject
}

export class UpdateTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private todoRepository: UpdateTodoRepository,
    private outputPort: UseCaseOutputPort<UpdateTodoResponseModel>
  ) {}

  public async interact({ id, name }: RequestModel): Promise<void> {
    try {
      const todoId = new IdentityObject(id)
      const todo = await this.todoRepository.getById(todoId)
      if (!todo) {
        return this.outputPort.failure(
          new TodoNotUpdatedError(`Todo with ID <${id}> do not exist`)
        )
      }
      todo.updateName(new TodoName(name))
      await this.todoRepository.save(todo)
      return this.outputPort.success({ id: todoId })
    } catch (e) {
      return this.outputPort.failure(new TodoNotUpdatedError(e as string))
    }
  }
}
