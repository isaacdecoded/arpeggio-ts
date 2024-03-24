import { Plan } from "../../domain/entities"
import { TodoStatus } from "../../domain/enums"

export interface TodoWriteModel {
  id: string
  planId: string
  description: string
  status: TodoStatus
  createdAt: Date
  updatedAt?: Date
}

export interface PlanWriteModel {
  name: string
  createdAt: Date
  updatedAt?: Date
}

interface TodoReadModel {
  id: string
  description: string
  status: TodoStatus
  createdAt: Date
  updatedAt?: Date
}

export interface PlanReadModel {
  id: string
  name: string
  todos: TodoReadModel[]
  createdAt: Date
  updatedAt?: Date
}

export class InMemoryRepository {
  public static readPlans: Map<string, PlanReadModel> = new Map()
  public static writePlans: Map<string, PlanWriteModel> = new Map()
  public static writeTodos: Map<string, TodoWriteModel[]> = new Map()

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
