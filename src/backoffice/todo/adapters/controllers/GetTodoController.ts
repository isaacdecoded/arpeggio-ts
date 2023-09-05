import strictAssert from 'assert/strict'
import { Controller } from '@core/adapters'
import { GetTodoUseCase } from '../../application'

interface RequestModel {
  id: string
}

export class GetTodoController implements Controller<RequestModel> {
  constructor(private useCase: GetTodoUseCase) {}

  async execute({ id }: RequestModel): Promise<void> {
    strictAssert(typeof id === 'string')
    this.useCase.interact({ id })
  }
}
