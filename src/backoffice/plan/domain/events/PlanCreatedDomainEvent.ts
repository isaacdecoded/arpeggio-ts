import { DomainEvent } from "@core/domain/events"
import { Plan } from "../entities"

export class PlanCreatedDomainEvent extends DomainEvent {
  private readonly _planName: string
  private readonly _planCreatedAt: Date

  constructor(plan: Plan) {
    super(PlanCreatedDomainEvent.name, plan.id.value)
    this._planName = plan.name.value
    this._planCreatedAt = plan.createdAt.value
  }

  get planName() {
    return this._planName
  }

  get planCreatedAt() {
    return this._planCreatedAt
  }
}
