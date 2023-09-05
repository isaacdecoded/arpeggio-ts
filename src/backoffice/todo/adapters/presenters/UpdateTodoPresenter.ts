import { UseCaseOutputPort } from '@core/application'
import { View } from '@core/adapters'
import { TodoNotSavedError } from '../../domain/errors'
import { UpdateTodoOutputData } from '../../application'

export interface UpdateTodoViewModel {
  id?: string
  error?: TodoNotSavedError
}

export class UpdateTodoPresenter implements UseCaseOutputPort<UpdateTodoOutputData> {
  constructor(private view: View<UpdateTodoViewModel>) {}

  public async success(outputData: UpdateTodoOutputData): Promise<void> {
    this.view.transform({ id: outputData.id.value.toString() })
  }

  public async failure(error: TodoNotSavedError): Promise<void> {
    this.view.transform({ error })
  }
}
