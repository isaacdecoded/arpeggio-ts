import { AggregateRoot, DateObject, ValueObject } from "../entities"

export interface DomainEvent {
  aggregateRoot: AggregateRoot
  occurringTime: DateObject
  eventName: ValueObject<string>
}
