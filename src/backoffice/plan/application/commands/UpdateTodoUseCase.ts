import { IdentityObject } from "@core/domain/models"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { TodoDescription } from "../../domain/value-objects"
import { PlanRepository } from "../../domain/repositories"
import { TodoNotUpdatedError } from "../errors"

interface RequestModel {
  planId: string
  todoId: string
  description: string
}

export interface UpdateTodoResponseModel {
  todoId: string
}

export class UpdateTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: PlanRepository,
    private outputPort: UseCaseOutputPort<UpdateTodoResponseModel>,
  ) {}

  public async interact({
    planId,
    todoId,
    description,
  }: RequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(planId))
      if (!plan) {
        return this.outputPort.failure(
          new TodoNotUpdatedError(`Plan with ID <${planId}> doesn't exist`),
        )
      }
      const id = new IdentityObject(todoId)
      plan.changeTodoDescription(id, new TodoDescription(description))
      await this.planRepository.save(plan)
      await this.outputPort.success({ todoId: id.value })
    } catch (e) {
      await this.outputPort.failure(
        new TodoNotUpdatedError((e as Error).message),
      )
    }
  }
}
