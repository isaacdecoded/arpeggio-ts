import { DomainEventBus } from "@core/domain/events"
import { PlanAggregate } from "./plan/PlanAggregate"

export class BackofficeContext {
  public readonly planAggregate: PlanAggregate

  constructor(domainEventBus: DomainEventBus) {
    this.planAggregate = new PlanAggregate(domainEventBus)
  }
}
