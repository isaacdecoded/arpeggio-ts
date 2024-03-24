import { AggregateRoot, IdentityObject, DateObject } from "@core/domain/models"
import { DomainEvent } from "@core/domain/events"

describe("AggregateRoot", () => {
  class TestDomainEvent extends DomainEvent {
    constructor(id: IdentityObject) {
      super("TestDomainEvent", id.value)
    }
  }
  class TestAggregateRoot extends AggregateRoot<IdentityObject> {
    static create() {
      const id = new IdentityObject("id")
      const testAggregateRoot = new TestAggregateRoot({
        id,
        createdAt: DateObject.now(),
      })
      testAggregateRoot.addDomainEvent(new TestDomainEvent(id))
      return testAggregateRoot
    }
  }

  it("should create a valid TestAggregateRoot", async () => {
    const id = new IdentityObject("id")
    const aggregateRoot = new TestAggregateRoot({
      id,
      createdAt: DateObject.now(),
    })
    expect(aggregateRoot.id.isEqual(id)).toBeTruthy()
  })

  it("should properly manage its DomainEvents", async () => {
    const aggregateRoot = TestAggregateRoot.create()
    expect(aggregateRoot.pullDomainEvents()).toHaveLength(1)
  })
})
