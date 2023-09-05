import { Entity, IdentityObject, DateObject } from '@core/domain/entities'


describe('Entity', () => {
  class TestEntity extends Entity {}

  it('should create a TestEntity with createdAt date', async () => {
    const id = new IdentityObject('id')
    const entity = new TestEntity({ id })

    expect(entity.id.isEqual(id)).toBeTruthy()
    expect(entity.createdAt).toBeInstanceOf(DateObject)
  })

  it('should create a TestEntity with specified createdAt and updatedAt dates', async () => {
    const id = new IdentityObject('id')
    const createdAt = new DateObject(new Date())
    const updatedAt = new DateObject(new Date())
    const entity = new TestEntity({ id, createdAt, updatedAt })

    expect(entity.createdAt.isEqual(createdAt)).toBeTruthy()
    expect(entity.updatedAt?.isEqual(updatedAt)).toBeTruthy()
  })

})