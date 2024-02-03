import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { GetTodoUseCase } from "../../application/use-cases"

interface RequestObject {
  id: string
}

export class GetTodoController implements Controller<RequestObject> {
  constructor(private useCase: GetTodoUseCase) {}

  async execute({ id }: RequestObject): Promise<void> {
    strictAssert(typeof id === "string")
    return this.useCase.interact({ id })
  }
}
