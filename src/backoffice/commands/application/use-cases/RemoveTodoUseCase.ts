import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { RemoveTodoRepository } from "../../domain/aggregates/remove-todo/repositories"
import { TodoNotRemovedError } from "../errors"
import { IdentityObject } from "@core/domain/entities"

interface RequestModel {
  id: string
}

export interface RemoveTodoResponseModel {
  removed: boolean
}

export class RemoveTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private todoRepository: RemoveTodoRepository,
    private outputPort: UseCaseOutputPort<RemoveTodoResponseModel>
  ) {}

  public async interact(input: RequestModel): Promise<void> {
    try {
      const id = new IdentityObject(input.id)
      const todo = await this.todoRepository.getById(id)
      if (!todo) {
        return this.outputPort.failure(
          new TodoNotRemovedError(`Todo with ID <${id.value}> do not exist`)
        )
      }
      todo.remove()
      await this.todoRepository.save(todo)
      return this.outputPort.success({ removed: true })
    } catch (e) {
      return this.outputPort.failure(new TodoNotRemovedError(e as string))
    }
  }
}
