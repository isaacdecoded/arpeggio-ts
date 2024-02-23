import { IdentityObject } from "@core/domain/models"
import { DomainEventBus } from "@core/domain/events"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { TodoDescription } from "../../domain/value-objects"
import { PlanRepository } from "../../domain/repositories"
import { TodoNotAddedError } from "../errors"

interface RequestModel {
  planId: string
  description: string
}

export interface AddTodoResponseModel {
  id: IdentityObject
}

export class AddTodoUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: PlanRepository,
    private domainEventBus: DomainEventBus,
    private outputPort: UseCaseOutputPort<AddTodoResponseModel>
  ) {}

  public async interact({ planId, description }: RequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(planId))
      if (!plan) {
        return this.outputPort.failure(
          new TodoNotAddedError(`Plan with ID <${planId}> doesn't exist`)
        )
      }
      const id = await this.planRepository.generateId()
      plan.addTodo(id, new TodoDescription(description))
      await this.planRepository.save(plan)
      await this.domainEventBus.publish(plan.pullDomainEvents())
      return this.outputPort.success({ id })
    } catch (e) {
      return this.outputPort.failure(
        new TodoNotAddedError((e as Error).message)
      )
    }
  }
}
