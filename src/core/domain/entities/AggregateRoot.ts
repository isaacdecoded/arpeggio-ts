import { Entity } from './Entity'
import { DomainEvent } from '../events'

export abstract class AggregateRoot extends Entity {
  private _domainEvents: DomainEvent[] = []
  protected _logEvents = false

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  get logEvents() {
    return this._logEvents
  }

  private logEventCreated(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    if (this._logEvents && thisClass && domainEventClass) {
      console.info(
        '[Domain Event Created]:',
        thisClass.constructor.name, '==>',
        domainEventClass.constructor.name,
      )
    }
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    this.logEventCreated(domainEvent)
  }

  protected clearDomainEvents(): void {
    this._domainEvents =[]
  }
}
