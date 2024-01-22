import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { UpdateTodoUseCase } from "../../application/use-cases"

interface RequestModel {
  id: string
  name: string
}

export class UpdateTodoController implements Controller<RequestModel> {
  constructor(private useCase: UpdateTodoUseCase) {}

  async execute({ id, name }: RequestModel): Promise<void> {
    strictAssert(typeof id === "string")
    strictAssert(typeof name === "string")
    return this.useCase.interact({ id, name })
  }
}
