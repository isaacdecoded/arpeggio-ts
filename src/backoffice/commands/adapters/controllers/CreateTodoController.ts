import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { CreateTodoUseCase } from "../../application/use-cases"

interface RequestObject {
  name: string
}

export class CreateTodoController implements Controller<RequestObject> {
  constructor(private useCase: CreateTodoUseCase) {}

  async execute({ name }: RequestObject): Promise<void> {
    strictAssert(typeof name === "string")
    return this.useCase.interact({ name })
  }
}
