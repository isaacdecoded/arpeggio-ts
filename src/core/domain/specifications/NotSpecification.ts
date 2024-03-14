import { Specification } from "./Specification"

export class NotSpecification<
  EntityOrValueObject,
> extends Specification<EntityOrValueObject> {
  constructor(private spec: Specification<EntityOrValueObject>) {
    super()
  }

  public isSatisfiedBy(t: EntityOrValueObject): boolean {
    return !this.spec.isSatisfiedBy(t)
  }
}
