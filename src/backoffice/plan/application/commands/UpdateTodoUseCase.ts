import { IdentityObject } from "@core/domain/entities"
import { UseCaseInputPort } from "@core/application"
import { TodoDescription } from "../../domain/value-objects"
import { PlanRepository } from "../../domain/repositories"
import { TodoNotUpdatedError } from "../errors"

interface RequestModel {
  planId: string
  todoId: string
  description: string
}

export interface UpdateTodoResponseModel {
  id: IdentityObject
}

export class UpdateTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(private planRepository: PlanRepository) {}

  public async interact({
    planId,
    todoId,
    description,
  }: RequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(planId))
      if (!plan) {
        throw new TodoNotUpdatedError(`Plan with ID <${planId}> doesn't exist`)
      }
      const id = new IdentityObject(todoId)
      plan.changeTodoDescription(id, new TodoDescription(description))
      await this.planRepository.save(plan)
    } catch (e) {
      throw new TodoNotUpdatedError((e as Error).message)
    }
  }
}
