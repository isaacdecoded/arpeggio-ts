import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { FindPlansUseCase } from "../../application/queries"

interface RequestObject {
  name?: string
  limit: number
  offset: number
}

export class FindPlansController implements Controller<RequestObject> {
  constructor(private useCase: FindPlansUseCase) {}

  async execute({ name, limit, offset }: RequestObject): Promise<void> {
    strictAssert(typeof limit === "number")
    strictAssert(typeof offset === "number")
    return this.useCase.interact({
      name,
      limit,
      offset,
    })
  }
}
