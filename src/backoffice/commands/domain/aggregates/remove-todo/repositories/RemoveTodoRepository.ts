import { IdentityObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"
import { Todo } from "../entities"

export interface RemoveTodoRepository {
  getById(id: IdentityObject): Promise<Nullable<Todo>>
  save(entity: Todo): Promise<void>
}
