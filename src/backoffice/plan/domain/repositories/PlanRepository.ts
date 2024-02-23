import { IdentityObject } from "@core/domain/models"
import { Nullable } from "@core/domain/repositories"
import { Plan } from "../entities"

export interface PlanRepository {
  generateId(): Promise<IdentityObject>
  getById(id: IdentityObject): Promise<Nullable<Plan>>
  save(entity: Plan): Promise<void>
}
