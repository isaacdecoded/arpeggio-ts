import { DomainEvent, DomainEventBus, DomainEventSubscriber } from '@core/domain/events'

export class InMemoryDomainEventBus implements DomainEventBus {
  private domainEventSubscribers: Map<string, DomainEventSubscriber[]> = new Map()

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    domainEvents.map(domainEvent => {
      const subscribers = this.domainEventSubscribers.get(domainEvent.eventName.value)
      if (subscribers) {
        subscribers.map(subscriber => subscriber.on(domainEvent))
      }
    })
    console.info('InMemoryDomainEventBus published.')
  }

  async addSubscribers(subscribers: DomainEventSubscriber[]): Promise<void> {
    subscribers.forEach(subscriber => {
      subscriber.subscribedTo().forEach(domainEventName => {
        const currentSubscriptions = this.domainEventSubscribers.get(domainEventName.value)
        if (currentSubscriptions) {
          currentSubscriptions.push(subscriber)
        } else {
          this.domainEventSubscribers.set(domainEventName.value, [subscriber])
        }
      })

    })
  }

  async start(): Promise<void> {
    console.info('InMemoryDomainEventBus started.')
  }
}