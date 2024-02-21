import { randomUUID } from "crypto"
import { DateObject, IdentityObject } from "@core/domain/entities"
import { Nullable } from "@core/domain/repositories"
import { Plan, Todo } from "../../domain/entities"
import { PlanName, TodoDescription } from "../../domain/value-objects"
import { PlanRepository } from "../../domain/repositories"
import { InMemoryRepository, PlanModel } from "./InMemoryRepository"

export class InMemoryPlanRepository implements PlanRepository {
  async generateId(): Promise<IdentityObject> {
    return new IdentityObject(randomUUID())
  }

  async getById(id: IdentityObject): Promise<Nullable<Plan>> {
    const planModel = InMemoryRepository.plans.get(id.value)
    return planModel ? this.toEntity(id.value, planModel) : planModel
  }

  async save(entity: Plan): Promise<void> {
    InMemoryRepository.plans.set(entity.id.value, this.toModel(entity))
  }

  private toModel(entity: Plan): PlanModel {
    return {
      id: entity.id.value,
      name: entity.name.value,
      todos: entity.todos.map((todo) => ({
        id: todo.id.value,
        description: todo.description.value,
        status: todo.status,
        createdAt: todo.createdAt.value,
        updatedAt: todo.updatedAt?.value,
      })),
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt?.value,
    }
  }

  private toEntity(id: string | number, model: PlanModel): Plan {
    return Plan.recreate({
      id: new IdentityObject(id),
      name: new PlanName(model.name),
      todos: model.todos.map(
        (todo) =>
          new Todo({
            id: new IdentityObject(todo.id),
            description: new TodoDescription(todo.description),
            status: todo.status,
            createdAt: new DateObject(todo.createdAt),
            updatedAt: todo.updatedAt
              ? new DateObject(todo.updatedAt)
              : undefined,
          })
      ),
      createdAt: new DateObject(model.createdAt),
      updatedAt: model.updatedAt ? new DateObject(model.updatedAt) : undefined,
    })
  }
}
