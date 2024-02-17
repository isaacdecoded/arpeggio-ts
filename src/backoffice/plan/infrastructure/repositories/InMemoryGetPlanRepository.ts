import { IdentityObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"
import { GetPlanRepository } from "../../domain/repositories"
import { GetPlanReadModel } from "../../application/queries"
import { InMemoryRepository } from "./InMemoryRepository"

export class InMemoryGetPlanRepository
  implements GetPlanRepository<GetPlanReadModel>
{
  async getById(id: IdentityObject): Promise<Nullable<GetPlanReadModel>> {
    const planModel = InMemoryRepository.readPlans.get(id.value)
    return planModel
      ? {
          name: planModel.name,
          todos: planModel.todos.map((todo) => ({
            id: todo.id.toString(),
            status: todo.status,
            description: todo.description,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
          })),
          createdAt: planModel.createdAt,
          updatedAt: planModel.updatedAt,
        }
      : planModel
  }
}
