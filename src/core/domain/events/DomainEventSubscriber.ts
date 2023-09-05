import { ValueObject } from '../entities'
import { DomainEvent } from './DomainEvent'

export interface DomainEventSubscriber {
  subscribedTo(): ValueObject<string>[]
  on(domainEvent: DomainEvent): Promise<void>
}
