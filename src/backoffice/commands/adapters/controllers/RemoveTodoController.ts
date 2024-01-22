import { Controller } from "@core/adapters"
import { RemoveTodoUseCase } from "../../application/use-cases"

interface RequestModel {
  id: string
}

export class RemoveTodoController implements Controller<RequestModel> {
  constructor(private useCase: RemoveTodoUseCase) {}

  async execute(requestModel: RequestModel): Promise<void> {
    return this.useCase.interact({ id: requestModel.id })
  }
}
