import {
  AggregateRoot,
  IdentityObject,
  DateObject,
  ValueObject,
} from "@core/domain/entities"
import { DomainEvent } from "@core/domain/events"

describe("AggregateRoot", () => {
  class TestAggregateRoot extends AggregateRoot {
    static create() {
      const id = new IdentityObject("id")
      const testAggregateRoot = new TestAggregateRoot({ id })
      testAggregateRoot.addDomainEvent(new TestDomainEvent(testAggregateRoot))
      return testAggregateRoot
    }
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

  it("should create a valid TestAggregateRoot", async () => {
    const id = new IdentityObject("id")
    const aggregateRoot = new TestAggregateRoot({ id })
    expect(aggregateRoot.id.isEqual(id)).toBeTruthy()
  })

  it("should properly manage its DomainEvents", async () => {
    const aggregateRoot = TestAggregateRoot.create()
    expect(aggregateRoot.pullDomainEvents()).toHaveLength(1)
  })
})
