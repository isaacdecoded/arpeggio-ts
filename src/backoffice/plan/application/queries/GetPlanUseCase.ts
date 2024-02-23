import { IdentityObject } from "@core/domain/models"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { GetPlanRepository } from "../../domain/repositories"
import { PlanNotFoundError } from "../errors"

export interface GetPlanRequestModel {
  id: string
}

interface PlanTodoReadModel {
  id: string
  description: string
  status: string
  createdAt: Date
  updatedAt?: Date
}

export interface GetPlanReadModel {
  name: string
  todos: PlanTodoReadModel[]
  createdAt: Date
  updatedAt?: Date
}

export interface GetPlanResponseModel {
  plan: GetPlanReadModel
}

export class GetPlanUseCase implements UseCaseInputPort<GetPlanRequestModel> {
  constructor(
    private planRepository: GetPlanRepository<GetPlanReadModel>,
    private outputPort: UseCaseOutputPort<GetPlanResponseModel>
  ) {}

  public async interact({ id }: GetPlanRequestModel): Promise<void> {
    try {
      const plan = await this.planRepository.getById(new IdentityObject(id))
      if (!plan) {
        return this.outputPort.failure(
          new PlanNotFoundError(`Plan with ID <${id}> doesn't exist`)
        )
      }
      return this.outputPort.success({ plan })
    } catch (e) {
      return this.outputPort.failure(
        new PlanNotFoundError((e as Error).message)
      )
    }
  }
}
