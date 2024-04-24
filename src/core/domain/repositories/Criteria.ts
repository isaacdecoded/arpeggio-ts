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

export interface Criteria<T> {
  filters: Filter<T>[]
  selections?: (keyof T)[]
  sorts?: Sort<T>[]
  limit?: number
  offset?: number
}
