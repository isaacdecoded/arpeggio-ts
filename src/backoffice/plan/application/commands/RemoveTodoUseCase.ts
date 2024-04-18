import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { IdentityObject } from "@core/domain/models"
import { PlanRepository } from "../../domain/repositories"
import { TodoNotRemovedError } from "../errors"

interface RequestModel {
  planId: string
  todoId: string
}

export interface RemoveTodoResponseModel {
  todoId: string
}

export class RemoveTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: PlanRepository,
    private outputPort: UseCaseOutputPort<RemoveTodoResponseModel>,
  ) {}

  public async interact({ planId, todoId }: RequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(planId))
      if (!plan) {
        return this.outputPort.failure(
          new TodoNotRemovedError(`Plan with ID <${planId}> doesn't exist`),
        )
      }
      const id = new IdentityObject(todoId)
      plan.removeTodo(id)
      await this.planRepository.save(plan)
      await this.outputPort.success({ todoId })
    } catch (e) {
      await this.outputPort.failure(
        new TodoNotRemovedError((e as Error).message),
      )
    }
  }
}
