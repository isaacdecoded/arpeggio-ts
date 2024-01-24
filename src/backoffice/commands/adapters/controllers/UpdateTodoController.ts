import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { UpdateTodoUseCase } from "../../application/use-cases"

interface RequestObject {
  id: string
  name: string
}

export class UpdateTodoController implements Controller<RequestObject> {
  constructor(private useCase: UpdateTodoUseCase) {}

  async execute({ id, name }: RequestObject): Promise<void> {
    strictAssert(typeof id === "string")
    strictAssert(typeof name === "string")
    return this.useCase.interact({ id, name })
  }
}
