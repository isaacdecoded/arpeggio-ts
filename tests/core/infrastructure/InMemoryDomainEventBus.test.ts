import {
  IdentityObject,
  DateObject,
  ValueObject,
  AggregateRoot,
} from "@core/domain/entities"
import { DomainEvent, DomainEventSubscriber } from "@core/domain/events"
import { InMemoryDomainEventBus } from "@core/infrastructure"

describe("InMemoryDomainEventBus", () => {
  class TestAggregateRoot extends AggregateRoot {}

  class TestSubscriber implements DomainEventSubscriber {
    subscribedTo(): string {
      return "TestDomainEvent"
    }
    on = jest.fn()
  }

  class TestDomainEvent implements DomainEvent {
    constructor(
      public aggregateRoot = new TestAggregateRoot({
        id: new IdentityObject("id"),
      }),
      public occurringTime = new DateObject(new Date()),
      public eventName = new ValueObject("TestDomainEvent")
    ) {}
  }

  it("should properly add a TestSubscriber and publish a TestDomainEvent", async () => {
    const inMemoryDomainEventBus = new InMemoryDomainEventBus()
    const testSubscriber = new TestSubscriber()
    const testDomainEvent = new TestDomainEvent()
    inMemoryDomainEventBus.addSubscribers([testSubscriber])
    inMemoryDomainEventBus.publish([testDomainEvent])

    expect(testSubscriber.on).toHaveBeenCalledWith(testDomainEvent)
  })
})
