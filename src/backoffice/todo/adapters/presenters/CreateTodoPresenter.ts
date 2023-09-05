import { UseCaseOutputPort } from '@core/application'
import { View } from '@core/adapters'
import { TodoNotSavedError } from '../../domain/errors'
import { CreateTodoOutputData } from '../../application'

export interface CreateTodoViewModel {
  id?: string
  error?: TodoNotSavedError
}

export class CreateTodoPresenter implements UseCaseOutputPort<CreateTodoOutputData> {
  constructor(private view: View<CreateTodoViewModel>) {}

  public async success(outputData: CreateTodoOutputData): Promise<void> {
    this.view.transform({ id: outputData.id.value.toString() })
  }

  public async failure(error: TodoNotSavedError): Promise<void> {
    this.view.transform({ error })
  }
}
