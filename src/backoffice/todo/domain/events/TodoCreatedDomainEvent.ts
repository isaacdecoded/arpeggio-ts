import { IdentityObject, DateObject, ValueObject } from '@core/domain/entities'
import { DomainEvent } from '@core/domain/events'

export class TodoCreatedDomainEvent implements DomainEvent {
  public occurringTime: DateObject
  public eventName: ValueObject<string>

  constructor(public aggregateId: IdentityObject) {
    this.eventName = new ValueObject('TodoCreatedDomainEvent')
    this.occurringTime = new DateObject(new Date())
  }
}
