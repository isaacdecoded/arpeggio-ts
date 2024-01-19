import { Entity } from "./Entity"
import { DomainEvent } from "../events"

export abstract class AggregateRoot extends Entity {
  private _domainEvents: DomainEvent[] = []

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = this._domainEvents
    this.clearDomainEvents()
    return domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    this.logEventCreated(domainEvent)
  }

  private logEventCreated(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    if (thisClass && domainEventClass) {
      // For example purposes only
      console.info(
        "[Domain Event Created]:",
        thisClass.constructor.name,
        "==>",
        domainEventClass.constructor.name
      )
    }
  }

  private clearDomainEvents(): void {
    this._domainEvents = []
  }
}
