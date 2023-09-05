import { IdentityObject, DateObject, ValueObject } from '@core/domain/entities'
import { DomainEvent, DomainEventSubscriber } from '@core/domain/events'
import { InMemoryDomainEventBus } from '@core/infrastructure'

describe('InMemoryDomainEventBus', () => {
  class TestSubscriber implements DomainEventSubscriber {
    subscribedTo(): ValueObject<string>[] {
      return [new ValueObject('TestDomainEvent')]
    }
    on = jest.fn()
  }

  class TestDomainEvent implements DomainEvent {
    constructor(
      public aggregateId = new IdentityObject('id'),
      public occurringTime = new DateObject(new Date()),
      public eventName = new ValueObject('TestDomainEvent'),
    ) {}
  }

  it('should properly add a TestSubscriber and publish a TestDomainEvent', async () => {
    const inMemoryDomainEventBus = new InMemoryDomainEventBus()
    const testSubscriber = new TestSubscriber()
    const testDomainEvent = new TestDomainEvent()
    inMemoryDomainEventBus.addSubscribers([testSubscriber])
    inMemoryDomainEventBus.publish([testDomainEvent])

    expect(testSubscriber.on).toHaveBeenCalled()
  })

})