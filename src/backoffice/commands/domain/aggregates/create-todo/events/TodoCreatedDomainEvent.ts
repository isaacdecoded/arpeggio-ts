import { DateObject, ValueObject } from "@core/domain/entities"
import { DomainEvent } from "@core/domain/events"
import { Todo } from "../entities"

export class TodoCreatedDomainEvent implements DomainEvent {
  public eventName: ValueObject<string>
  public occurringTime: DateObject

  constructor(public aggregateRoot: Todo) {
    this.occurringTime = new DateObject(new Date())
    this.eventName = new ValueObject("TodoCreatedDomainEvent")
  }
}
