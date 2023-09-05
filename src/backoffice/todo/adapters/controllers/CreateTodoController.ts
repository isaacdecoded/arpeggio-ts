import strictAssert from 'assert/strict'
import { Controller } from '@core/adapters'
import { CreateTodoUseCase } from '../../application'

interface RequestModel {
  name: string
}

export class CreateTodoController implements Controller<RequestModel> {
  constructor(private useCase: CreateTodoUseCase) {}

  async execute({ name }: RequestModel): Promise<void> {
    strictAssert(typeof name === 'string')
    this.useCase.interact({ name })
  }
}
