import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { AddTodoUseCase } from "../../application/commands"

interface RequestObject {
  planId: string
  description: string
}

export class AddTodoController implements Controller<RequestObject> {
  constructor(private useCase: AddTodoUseCase) {}

  async execute({ planId, description }: RequestObject): Promise<void> {
    strictAssert(typeof planId === "string")
    strictAssert(typeof description === "string")
    return this.useCase.interact({ planId, description })
  }
}
