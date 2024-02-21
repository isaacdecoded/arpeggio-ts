import { Criteria } from "@core/domain/repositories"
import { FindPlansRepository } from "../../domain/repositories"
import { FindPlansReadModel } from "../../application/queries"
import { InMemoryRepository } from "./InMemoryRepository"

export class InMemoryFindPlansRepository
  implements FindPlansRepository<FindPlansReadModel>
{
  async find(
    criteria: Criteria<FindPlansReadModel>
  ): Promise<FindPlansReadModel[]> {
    // TODO: implement Criteria behaviors
    const plans: FindPlansReadModel[] = []
    InMemoryRepository.plans.forEach((value, key) => {
      plans.push({
        id: key.toString(),
        name: value.name,
        todoCount: value.todos.length,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      })
    })
    return plans
  }
}
