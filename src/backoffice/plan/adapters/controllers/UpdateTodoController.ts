import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { UpdateTodoUseCase } from "../../application/commands"

interface RequestObject {
  planId: string
  todoId: string
  description: string
}

export class UpdateTodoController implements Controller<RequestObject> {
  constructor(private useCase: UpdateTodoUseCase) {}

  async execute({ planId, todoId, description }: RequestObject): Promise<void> {
    strictAssert(typeof planId === "string")
    strictAssert(typeof todoId === "string")
    strictAssert(typeof description === "string")
    return this.useCase.interact({
      planId,
      todoId,
      description,
    })
  }
}
