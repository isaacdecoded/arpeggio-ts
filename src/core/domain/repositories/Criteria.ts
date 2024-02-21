export type FilterOperator =
  | "="
  | "!="
  | ">"
  | "<"
  | ">="
  | "<="
  | "contains"
  | "not_contains"

export interface Filter<T> {
  field: keyof T
  operator: FilterOperator
  value: number | string | boolean | Date
}

export interface Sort<T> {
  field: keyof T
  order?: "asc" | "desc"
}

/**
 * Offset-based pagination and filter interface.
 */
export interface Criteria<T> {
  filters: Filter<T>[]
  selection?: (keyof T)[]
  limit?: number
  offset?: number
  sort?: Sort<T>
}
