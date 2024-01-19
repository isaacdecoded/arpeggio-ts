import { Nullable } from "@core/domain/repositories"
import { IdentityObject } from "@core/domain/entities"
import { Todo } from "../entities"

export interface UpdateTodoRepository {
  getById(id: IdentityObject): Promise<Nullable<Todo>>
  save(entity: Todo): Promise<void>
}
