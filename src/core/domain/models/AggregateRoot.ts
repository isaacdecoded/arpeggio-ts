import { Entity } from "./Entity"
import { DomainEvent } from "../events"

export abstract class AggregateRoot extends Entity {
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
