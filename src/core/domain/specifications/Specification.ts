import { AndSpecification } from "./AndSpecification"
import { NotSpecification } from "./NotSpecification"
import { OrSpecification } from "./OrSpecification"

export abstract class Specification<EntityOrValueObject> {
  public abstract isSatisfiedBy(t: EntityOrValueObject): boolean

  public and(
    specification: Specification<EntityOrValueObject>,
  ): Specification<EntityOrValueObject> {
    return new AndSpecification<EntityOrValueObject>(this, specification)
  }

  public or(
    specification: Specification<EntityOrValueObject>,
  ): Specification<EntityOrValueObject> {
    return new OrSpecification<EntityOrValueObject>(this, specification)
  }

  public not(
    specification: Specification<EntityOrValueObject>,
  ): Specification<EntityOrValueObject> {
    return new NotSpecification<EntityOrValueObject>(specification)
  }
}
