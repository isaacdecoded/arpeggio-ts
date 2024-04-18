import { Specification } from "./Specification"

export class NotSpecification<T> extends Specification<T> {
  constructor(private spec: Specification<T>) {
    super()
  }

  public isSatisfiedBy(candidate: T): boolean {
    return !this.spec.isSatisfiedBy(candidate)
  }
}
