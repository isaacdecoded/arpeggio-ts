import strictAssert from 'assert/strict'
import { Controller } from '@core/adapters'
import { FindTodosUseCase } from '../../application'

interface RequestModel {
  name?: string
  limit: number
  offset: number
}

export class FindTodosController implements Controller<RequestModel> {
  constructor(private useCase: FindTodosUseCase) {}

  async execute({ name, limit, offset }: RequestModel): Promise<void> {
    strictAssert(typeof limit === 'number')
    strictAssert(typeof limit === 'number')
    this.useCase.interact({
      name,
      limit,
      offset,
    })
  }
}
