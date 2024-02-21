import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { CreatePlanUseCase } from "../../application/commands"

interface RequestObject {
  name: string
}

export class CreatePlanController implements Controller<RequestObject> {
  constructor(private useCase: CreatePlanUseCase) {}

  async execute({ name }: RequestObject): Promise<void> {
    strictAssert(typeof name === "string")
    return this.useCase.interact({ name })
  }
}
