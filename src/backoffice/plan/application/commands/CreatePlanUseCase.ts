import { DomainEventBus } from "@core/domain/events"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { Plan } from "../../domain/entities"
import { PlanName } from "../../domain/value-objects"
import { PlanRepository } from "../../domain/repositories"
import { PlanNotCreatedError } from "../errors"

interface RequestModel {
  name: string
}

export interface CreatePlanResponseModel {
  planId: string
}

export class CreatePlanUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: PlanRepository,
    private domainEventBus: DomainEventBus,
    private outputPort: UseCaseOutputPort<CreatePlanResponseModel>,
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
      return this.outputPort.success({ planId: id.value })
    } catch (e) {
      return this.outputPort.failure(
        new PlanNotCreatedError((e as Error).message),
      )
    }
  }
}
