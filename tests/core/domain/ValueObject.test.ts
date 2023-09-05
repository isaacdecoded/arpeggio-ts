import { ValueObject } from '@core/domain/entities'

describe('ValueObject', () => {
  it('should create a ValueObject with properly string value', async () => {
    const value = 'value'
    const valueObject = new ValueObject(value)

    expect(valueObject.value).toEqual(value)
  })
})