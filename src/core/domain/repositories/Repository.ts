import { Entity, ValueObject } from '../entities'

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
  find?(criteria?: Criteria<T>): Promise<Entity[]>
  create?(entity: T): Promise<void>
  read?(entityId: ValueObject<string>): Promise<Entity>
  save?(entity: T): Promise<void>
  delete?(filters: Filter<T>[]): Promise<void>
  exists?(filters: Filter<T>[]): Promise<boolean>
  count?(filters?: Filter<T>[]): Promise<number>
}
