import { DomainEvent } from "../events"
import { Entity } from "./Entity"
import { ValueObject } from "./ValueObject"

export abstract class AggregateRoot<
  Id extends ValueObject<string>,
> extends Entity<Id> {
  private _domainEvents: DomainEvent[] = []

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = this._domainEvents
    this._domainEvents = []
    return domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
  }
}
