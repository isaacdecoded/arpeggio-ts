import { IdentityObject, DateObject, ValueObject } from '../entities'

export interface DomainEvent {
  aggregateId: IdentityObject
  occurringTime: DateObject
  eventName: ValueObject<string>
}
