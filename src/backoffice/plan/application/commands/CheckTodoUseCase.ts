import { IdentityObject } from "@core/domain/entities"
import { DomainEventBus } from "@core/domain/events"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { PlanRepository } from "../../domain/repositories"
import { TodoNotCheckedError } from "../errors"

interface RequestModel {
  planId: string
  todoId: string
}

export interface CheckTodoResponseModel {
  id: IdentityObject
}

export class CheckTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: PlanRepository,
    private outputPort: UseCaseOutputPort<CheckTodoResponseModel>,
    private domainEventBus: DomainEventBus
  ) {}

  public async interact({ planId, todoId }: RequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(planId))
      if (!plan) {
        return this.outputPort.failure(
          new TodoNotCheckedError(`Plan with ID <${planId}> doesn't exist`)
        )
      }
      const id = new IdentityObject(todoId)
      plan.markTodoAsDone(id)
      await this.planRepository.save(plan)
      await this.domainEventBus.publish(plan.pullDomainEvents())
      return this.outputPort.success({ id })
    } catch (e) {
      return this.outputPort.failure(new TodoNotCheckedError(e as string))
    }
  }
}
