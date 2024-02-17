import { Criteria } from "@core/domain/repositories"
import { UseCaseInputPort, UseCaseOutputPort } from "@core/application"
import { PlansNotFoundError } from "../errors"
import { FindPlansRepository } from "../../domain/repositories"

export interface RequestModel {
  name?: string
  offset: number
  limit: number
}

export interface FindPlansReadModel {
  id: string
  name: string
  todoCount: number
  createdAt: Date
  updatedAt?: Date
}

export interface FindPlansResponseModel {
  plans: FindPlansReadModel[]
}

export class FindPlansUseCase implements UseCaseInputPort<RequestModel> {
  constructor(
    private planRepository: FindPlansRepository<FindPlansReadModel>,
    private outputPort: UseCaseOutputPort<FindPlansResponseModel>
  ) {}

  public async interact({ name, offset, limit }: RequestModel): Promise<void> {
    try {
      const criteria: Criteria<FindPlansReadModel> = {
        filters: [],
        limit,
        offset,
        selection: ["name"],
        sort: { field: "createdAt", order: "desc" },
      }
      if (name) {
        criteria.filters.push({
          field: "name",
          operator: "contains",
          value: name,
        })
      }
      const plans = await this.planRepository.find(criteria)
      return this.outputPort.success({ plans })
    } catch (e) {
      return this.outputPort.failure(
        new PlansNotFoundError((e as Error).message)
      )
    }
  }
}
