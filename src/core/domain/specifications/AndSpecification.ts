import { Specification } from "./Specification"

export class AndSpecification<
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
