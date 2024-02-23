import { ValueObject } from "@core/domain/models"

describe("ValueObject", () => {
  class TestValueObject extends ValueObject<string> {}

  it("should create a ValueObject with properly string value", async () => {
    const value = "value"
    const valueObject = new TestValueObject(value)

    expect(valueObject.value).toEqual(value)
  })
})
