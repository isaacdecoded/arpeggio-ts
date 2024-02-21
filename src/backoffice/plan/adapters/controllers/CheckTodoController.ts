import strictAssert from "assert/strict"
import { Controller } from "@core/adapters"
import { CheckTodoUseCase } from "../../application/commands"

interface RequestObject {
  planId: string
  todoId: string
}

export class CheckTodoController implements Controller<RequestObject> {
  constructor(private useCase: CheckTodoUseCase) {}

  async execute({ planId, todoId }: RequestObject): Promise<void> {
    strictAssert(typeof planId === "string")
    strictAssert(typeof todoId === "string")
    return this.useCase.interact({
      planId,
      todoId,
    })
  }
}
