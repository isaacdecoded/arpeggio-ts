import { IdentityObject } from "@core/domain/entities"
import { DomainEventBus } from "@core/domain/events"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { Plan } from "../../domain/entities"
import { PlanName } from "../../domain/value-objects"
import { TodoNotAddedError } from "../errors"
import { PlanRepository } from "../../domain/repositories"

interface RequestModel {
  name: string
}

export interface CreatePlanResponseModel {
  id: IdentityObject
}

export class CreatePlanUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: PlanRepository,
    private outputPort: UseCaseOutputPort<CreatePlanResponseModel>,
    private domainEventBus: DomainEventBus
  ) {}

  public async interact({ name }: RequestModel): Promise<void> {
    try {
      const id = await this.planRepository.generateId()
      const plan = Plan.create({
        id,
        name: new PlanName(name),
      })
      await this.planRepository.save(plan)
      await this.domainEventBus.publish(plan.pullDomainEvents())
      return this.outputPort.success({ id })
    } catch (e) {
      return this.outputPort.failure(new TodoNotAddedError(e as string))
    }
  }
}
