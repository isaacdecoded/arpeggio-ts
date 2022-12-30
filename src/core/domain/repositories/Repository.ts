import { Entity, IdentityObject } from '../entities'

export type WithId<T extends Entity> = T & { id: IdentityObject }
export type FilterOperator = '=' | '!=' | '>' | '<'

export interface Filter<T> {
  field: keyof T
  operator: FilterOperator
  value: number | string | boolean | Date,
}

export interface Sort<T> {
  field: keyof T
  order?: 'asc' | 'desc'
}

export interface Criteria<T> {
  filters: Filter<T>[]
  selection?: (keyof T)[]
  sort?: Sort<T>
  limit?: number
  offset?: number
  nextPageToken?: string
}

export interface Repository<T extends Entity> {
  find(criteria?: Criteria<T>): Promise<WithId<T>[]>
  create(entity: T): Promise<void>
  read(entityId: IdentityObject): Promise<WithId<T>>
  update(entityId: IdentityObject, entity: T): Promise<void>
  delete(filters: Filter<T>[]): Promise<void>
  exists(filters: Filter<T>[]): Promise<boolean>
  count(filters?: Filter<T>[]): Promise<number>
}
