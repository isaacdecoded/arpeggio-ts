import { Criteria } from "@core/domain/repositories"
import { FindPlansRepository } from "../../domain/repositories"
import { FindPlansReadModel } from "../../application/queries"
import { InMemoryRepository } from "./InMemoryRepository"

export class InMemoryFindPlansRepository
  implements FindPlansRepository<FindPlansReadModel>
{
  async find(
    criteria: Criteria<FindPlansReadModel>,
  ): Promise<FindPlansReadModel[]> {
    const plans: FindPlansReadModel[] = []
    InMemoryRepository.readPlans.forEach((value, key) => {
      plans.push({
        id: key.toString(),
        name: value.name,
        todoCount: value.todos.length,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      })
    })
    return plans.filter((p) => {
      return criteria.filters.every((f) => {
        switch (f.operator) {
          case "=":
            return p[f.field] === f.value

          case "!=":
            return p[f.field] !== f.value

          case "contains":
            return `${p[f.field]}`.includes(f.value.toString())

          case "not_contains":
            return !`${p[f.field]}`.includes(f.value.toString())
        }
      })
    })
  }
}
