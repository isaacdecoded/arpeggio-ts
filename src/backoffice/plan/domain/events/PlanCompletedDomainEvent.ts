import { DomainEvent } from "@core/domain/events"
import { Plan } from "../entities"

export class PlanCompletedDomainEvent extends DomainEvent {
  private readonly _planName: string

  constructor(plan: Plan) {
    super(PlanCompletedDomainEvent.name, plan.id.value)
    this._planName = plan.name.value
  }

  get planName() {
    return this._planName
  }
}
