import { AndSpecification } from "./AndSpecification"
import { NotSpecification } from "./NotSpecification"
import { OrSpecification } from "./OrSpecification"

export abstract class Specification<T> {
  public abstract isSatisfiedBy(t: T): boolean

  public and(specification: Specification<T>): Specification<T> {
    return new AndSpecification<T>(this, specification)
  }

  public or(specification: Specification<T>): Specification<T> {
    return new OrSpecification<T>(this, specification)
  }

  public not(specification: Specification<T>): Specification<T> {
    return new NotSpecification<T>(specification)
  }
}
