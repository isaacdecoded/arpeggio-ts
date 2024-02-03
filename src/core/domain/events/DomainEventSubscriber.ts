import { DomainEvent } from "./DomainEvent"

export interface DomainEventSubscriber<
  ConcreteDomainEvent extends DomainEvent
> {
  subscribedTo(): string
  on(domainEvent: ConcreteDomainEvent): Promise<void>
}
