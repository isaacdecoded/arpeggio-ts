import { IdentityObject } from "@core/domain/models"
import { Nullable } from "@core/domain/repositories"

export interface GetPlanRepository<ReadModel> {
  getById(id: IdentityObject): Promise<Nullable<ReadModel>>
}
