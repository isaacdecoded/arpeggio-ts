import { randomUUID } from "crypto"
import { DateObject, IdentityObject } from "@core/domain/models"
import { Nullable } from "@core/domain/repositories"
import { Plan, Todo } from "../../domain/entities"
import { PlanName, TodoDescription } from "../../domain/value-objects"
import { PlanRepository } from "../../domain/repositories"
import {
  InMemoryRepository,
  PlanWriteModel,
  TodoWriteModel,
} from "./InMemoryRepository"

export class InMemoryPlanRepository implements PlanRepository {
  async generateId(): Promise<IdentityObject> {
    return new IdentityObject(randomUUID())
  }

  async getById(id: IdentityObject): Promise<Nullable<Plan>> {
    const planModel = InMemoryRepository.writePlans.get(id.value)
    return planModel ? this.planModelToEntity(id.value, planModel) : planModel
  }

  async save(plan: Plan): Promise<void> {
    InMemoryRepository.writePlans.set(plan.id.value, this.planToModel(plan))
    const todoModels = plan.todos.map((todo) => this.todoToModel(plan.id, todo))
    InMemoryRepository.writeTodos.set(plan.id.value, todoModels)
    InMemoryRepository.syncReadPlans(plan)
  }

  private planToModel(plan: Plan): PlanWriteModel {
    return {
      name: plan.name.value,
      createdAt: plan.createdAt.value,
      updatedAt: plan.updatedAt?.value,
    }
  }

  private todoToModel(planId: IdentityObject, entity: Todo): TodoWriteModel {
    return {
      id: entity.id.value,
      planId: planId.value,
      description: entity.description.value,
      status: entity.status,
      createdAt: entity.createdAt.value,
      updatedAt: entity.updatedAt?.value,
    }
  }

  private planModelToEntity(id: string, model: PlanWriteModel): Plan {
    const todoModels = InMemoryRepository.writeTodos.get(id) || []
    return Plan.recreate({
      id: new IdentityObject(id),
      name: new PlanName(model.name),
      todos: todoModels.map(
        (todo) =>
          new Todo({
            id: new IdentityObject(todo.id),
            description: new TodoDescription(todo.description),
            status: todo.status,
            createdAt: new DateObject(todo.createdAt),
            updatedAt: todo.updatedAt
              ? new DateObject(todo.updatedAt)
              : undefined,
          }),
      ),
      createdAt: new DateObject(model.createdAt),
      updatedAt: model.updatedAt ? new DateObject(model.updatedAt) : undefined,
    })
  }
}
