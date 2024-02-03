import {
  DomainEvent,
  DomainEventBus,
  DomainEventSubscriber,
} from "@core/domain/events"

export class InMemoryDomainEventBus implements DomainEventBus {
  private domainEventSubscribers: Map<
    string,
    DomainEventSubscriber<DomainEvent>[]
  > = new Map()

  async publish(domainEvents: DomainEvent[]): Promise<void> {
    for (const domainEvent of domainEvents) {
      const subscribers = this.domainEventSubscribers.get(domainEvent.name)
      if (subscribers) {
        await Promise.all(
          subscribers.map((subscriber) => subscriber.on(domainEvent))
        )
      }
    }
  }

  async addSubscribers(
    subscribers: DomainEventSubscriber<DomainEvent>[]
  ): Promise<void> {
    subscribers.forEach((subscriber) => {
      const domainEventName = subscriber.subscribedTo()
      const currentSubscriptions =
        this.domainEventSubscribers.get(domainEventName)
      if (currentSubscriptions) {
        currentSubscriptions.push(subscriber)
      } else {
        this.domainEventSubscribers.set(domainEventName, [subscriber])
      }
    })
  }
}
