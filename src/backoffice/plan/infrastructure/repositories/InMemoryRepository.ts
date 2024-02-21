import { TodoStatuses } from "../../domain/entities"

interface TodoModel {
  id: string | number
  description: string
  status: TodoStatuses
  createdAt: Date
  updatedAt?: Date
}

export interface PlanModel {
  id: string | number
  name: string
  todos: TodoModel[]
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryRepository {
  public static plans: Map<string | number, PlanModel> = new Map()
}
