import { DomainEvent } from "./DomainEvent"

export interface DomainEventSubscriber {
  subscribedTo(): string
  on(domainEvent: DomainEvent): Promise<void>
}
