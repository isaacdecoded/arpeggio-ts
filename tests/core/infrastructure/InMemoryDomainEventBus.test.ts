import { IdentityObject } from "@core/domain/entities"
import { DomainEvent, DomainEventSubscriber } from "@core/domain/events"
import { InMemoryDomainEventBus } from "@core/infrastructure"

describe("InMemoryDomainEventBus", () => {
  class TestSubscriber implements DomainEventSubscriber<DomainEvent> {
    subscribedTo(): string {
      return "TestDomainEvent"
    }
    on = jest.fn()
  }

  class TestDomainEvent extends DomainEvent {
    constructor(id: IdentityObject) {
      super("TestDomainEvent", id.value)
    }
  }

  it("should properly add a TestSubscriber and publish a TestDomainEvent", async () => {
    const inMemoryDomainEventBus = new InMemoryDomainEventBus()
    const testSubscriber = new TestSubscriber()
    const testDomainEvent = new TestDomainEvent(new IdentityObject("id"))
    inMemoryDomainEventBus.addSubscribers([testSubscriber])
    inMemoryDomainEventBus.publish([testDomainEvent])

    expect(testSubscriber.on).toHaveBeenCalledWith(testDomainEvent)
  })
})
