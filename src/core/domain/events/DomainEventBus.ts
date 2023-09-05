import { DomainEventSubscriber } from './DomainEventSubscriber'
import { DomainEvent } from './DomainEvent'

export interface DomainEventBus {
  publish(domainEvents: DomainEvent[]): Promise<void>
  addSubscribers(subscribers: DomainEventSubscriber[]): Promise<void>
  start(): Promise<void>
}
