import { DomainEvent } from './DomainEvent'

export interface DomainEventHandler {
  domainEventName: string
  execute(domainEvent: DomainEvent): Promise<void>
}
