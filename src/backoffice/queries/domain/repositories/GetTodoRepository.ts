import { IdentityObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"

export interface GetTodoRepository<ReadModel> {
  getById(id: IdentityObject): Promise<Nullable<ReadModel>>
}
