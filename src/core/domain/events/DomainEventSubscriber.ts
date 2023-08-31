import { DomainEvent } from './DomainEvent'

export interface DomainEventSubscriber {
  domainEventName: string
  on(domainEvent: DomainEvent): Promise<void>
}
