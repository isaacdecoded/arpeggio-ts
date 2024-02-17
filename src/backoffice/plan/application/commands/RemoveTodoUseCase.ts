import { UseCaseInputPort } from "@core/application"
import { PlanRepository } from "../../domain/repositories"
import { TodoNotRemovedError } from "../errors"
import { IdentityObject } from "@core/domain/entities"

interface RequestModel {
  planId: string
  todoId: string
}

export interface RemoveTodoResponseModel {
  id: IdentityObject
}

export class RemoveTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(private planRepository: PlanRepository) {}

  public async interact({ planId, todoId }: RequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(planId))
      if (!plan) {
        throw new TodoNotRemovedError(`Plan with ID <${planId}> doesn't exist`)
      }
      const id = new IdentityObject(todoId)
      plan.removeTodo(id)
      await this.planRepository.save(plan)
    } catch (e) {
      throw new TodoNotRemovedError((e as Error).message)
    }
  }
}
