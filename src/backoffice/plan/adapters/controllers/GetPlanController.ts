import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { GetPlanUseCase } from "../../application/queries"

interface RequestObject {
  id: string
}

export class GetPlanController implements Controller<RequestObject> {
  constructor(private useCase: GetPlanUseCase) {}

  async execute({ id }: RequestObject): Promise<void> {
    strictAssert(typeof id === "string")
    return this.useCase.interact({ id })
  }
}
