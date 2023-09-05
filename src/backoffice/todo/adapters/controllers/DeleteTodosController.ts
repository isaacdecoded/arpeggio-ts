import { Controller } from '@core/adapters'
import { DeleteTodoUseCase } from '../../application'

interface RequestModel {
  id?: string
}

export class DeleteTodosController implements Controller<RequestModel> {
  constructor(private useCase: DeleteTodoUseCase) {}

  async execute(requestModel?: RequestModel): Promise<void> {
    this.useCase.interact({ id: requestModel?.id })
  }
}
