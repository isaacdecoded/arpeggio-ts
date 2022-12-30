import { AggregateRoot } from '../entities/AggregateRoot'
import { DomainEventHandler } from './DomainEventHandler'

/**
 * Singleton design pattern-based DomainEventBus implementation
 */
export class DomainEventBus {
  private static handlersMapper: Map<string, DomainEventHandler[]> = new Map()

  public static async dispatch(aggregateRoot: AggregateRoot): Promise<void> {
    for (const domainEvent of aggregateRoot.domainEvents) {
      const domainEventHandlers = this.handlersMapper.get(domainEvent.constructor.name) || []
      await Promise.all(
        domainEventHandlers.map(domainEventHandler => {
          console.info(
            '[Domain Event Dispatch]:',
            domainEvent.aggregateRoot.constructor.name, '==>',
            domainEvent.constructor.name, '==>',
            domainEventHandler.constructor.name,
          )
          domainEventHandler.execute(domainEvent)
        }),
      )
    }
  }

  public static addHandler(domainEventHandler: DomainEventHandler): void {
    const currentDomainEventHandlers = this.handlersMapper.get(domainEventHandler.domainEventName) || []
    currentDomainEventHandlers.push(domainEventHandler)
    this.handlersMapper.set(
      domainEventHandler.domainEventName,
      currentDomainEventHandlers,
    )
  }
}
