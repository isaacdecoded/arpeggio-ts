import { IdentityObject } from '@core/domain/entities'
import { Criteria, Nullable } from '@core/domain/repositories'
import { Todo } from '../entities'

export interface TodoRepository {
  generateId(): Promise<string>
  find(criteria?: Criteria<Todo>): Promise<Todo[]>
  getById(id: IdentityObject): Promise<Nullable<Todo>>
  save(entity: Todo): Promise<void>
  delete(criteria?: Criteria<Todo>): Promise<number>
}
