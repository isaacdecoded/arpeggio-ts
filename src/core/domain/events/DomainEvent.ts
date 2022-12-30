import { AggregateRoot } from '../entities'

export interface DomainEvent {
  ocurringTime: Date
  aggregateRoot: AggregateRoot
  metadata?: object
}
