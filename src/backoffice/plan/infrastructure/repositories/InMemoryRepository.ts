import { Plan, TodoStatuses } from "../../domain/entities"

export interface TodoWriteModel {
  id: string | number
  planId: string | number
  description: string
  status: TodoStatuses
  createdAt: Date
  updatedAt?: Date
}

export interface PlanWriteModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

interface TodoReadModel {
  id: string | number
  description: string
  status: TodoStatuses
  createdAt: Date
  updatedAt?: Date
}

export interface PlanReadModel {
  id: string | number
  name: string
  todos: TodoReadModel[]
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryRepository {
  public static readPlans: Map<string | number, PlanReadModel> = new Map()
  public static writePlans: Map<string | number, PlanWriteModel> = new Map()
  public static writeTodos: Map<string | number, TodoWriteModel[]> = new Map()

  public static syncReadPlans(plan: Plan) {
    InMemoryRepository.readPlans.set(plan.id.value, {
      id: plan.id.value,
      name: plan.name.value,
      todos: plan.todos.map((todo) => ({
        id: todo.id.value,
        description: todo.description.value,
        status: todo.status,
        createdAt: todo.createdAt.value,
        updatedAt: todo.updatedAt?.value,
      })),
      createdAt: plan.createdAt.value,
      updatedAt: plan.updatedAt?.value,
    })
  }
}
