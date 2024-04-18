import { Specification } from "./Specification"

export class AndSpecification<T> extends Specification<T> {
  constructor(
    private spec1: Specification<T>,
    private spec2: Specification<T>,
  ) {
    super()
  }

  public isSatisfiedBy(candidate: T): boolean {
    return (
      this.spec1.isSatisfiedBy(candidate) && this.spec2.isSatisfiedBy(candidate)
    )
  }
}
