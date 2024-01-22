import { IdentityObject } from "@core/domain/entities"
import { Todo } from "../entities"

export interface CreateTodoRepository {
  generateId(): Promise<IdentityObject>
  save(entity: Todo): Promise<void>
}
