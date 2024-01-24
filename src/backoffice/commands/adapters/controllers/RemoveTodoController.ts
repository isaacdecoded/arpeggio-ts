import { Controller } from "@core/adapters"
import { RemoveTodoUseCase } from "../../application/use-cases"

interface RequestObject {
  id: string
}

export class RemoveTodoController implements Controller<RequestObject> {
  constructor(private useCase: RemoveTodoUseCase) {}

  async execute(requestObject: RequestObject): Promise<void> {
    return this.useCase.interact({ id: requestObject.id })
  }
}
