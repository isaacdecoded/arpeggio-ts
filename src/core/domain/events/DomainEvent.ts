import { ValueObject } from '../entities'

export interface DomainEvent {
  aggregateId: ValueObject<string>
  eventName: ValueObject<string>
  occurringTime: ValueObject<Date>
  metadata?: ValueObject<object>
}
