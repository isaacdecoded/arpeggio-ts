export abstract class Specification<EntityOrValueObject> {
  public abstract isSatisfiedBy(t: EntityOrValueObject): boolean

  public and(
    specification: Specification<EntityOrValueObject>
  ): Specification<EntityOrValueObject> {
    return new AndSpecification<EntityOrValueObject>(this, specification)
  }

  public or(
    specification: Specification<EntityOrValueObject>
  ): Specification<EntityOrValueObject> {
    return new OrSpecification<EntityOrValueObject>(this, specification)
  }

  public not(
    specification: Specification<EntityOrValueObject>
  ): Specification<EntityOrValueObject> {
    return new NotSpecification<EntityOrValueObject>(specification)
  }
}

class AndSpecification<
  EntityOrValueObject
> extends Specification<EntityOrValueObject> {
  constructor(
    private spec1: Specification<EntityOrValueObject>,
    private spec2: Specification<EntityOrValueObject>
  ) {
    super()
  }

  public isSatisfiedBy(t: EntityOrValueObject): boolean {
    return this.spec1.isSatisfiedBy(t) && this.spec2.isSatisfiedBy(t)
  }
}

class OrSpecification<
  EntityOrValueObject
> extends Specification<EntityOrValueObject> {
  constructor(
    private spec1: Specification<EntityOrValueObject>,
    private spec2: Specification<EntityOrValueObject>
  ) {
    super()
  }

  public isSatisfiedBy(t: EntityOrValueObject): boolean {
    return this.spec1.isSatisfiedBy(t) || this.spec2.isSatisfiedBy(t)
  }
}

class NotSpecification<
  EntityOrValueObject
> extends Specification<EntityOrValueObject> {
  constructor(private spec: Specification<EntityOrValueObject>) {
    super()
  }

  public isSatisfiedBy(t: EntityOrValueObject): boolean {
    return !this.spec.isSatisfiedBy(t)
  }
}
