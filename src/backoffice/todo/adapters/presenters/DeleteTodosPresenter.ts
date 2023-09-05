import { UseCaseOutputPort } from '@core/application'
import { View } from '@core/adapters'
import { TodosNotDeletedError } from '../../domain/errors'
import { DeleteTodoOutputData } from '../../application'

export interface DeleteTodosViewModel {
  totalDeleted?: number
  error?: TodosNotDeletedError
}

export class DeleteTodosPresenter implements UseCaseOutputPort<DeleteTodoOutputData> {
  constructor(private view: View<DeleteTodosViewModel>) {}

  public async success(outputData: DeleteTodoOutputData): Promise<void> {
    this.view.transform({ totalDeleted: outputData.totalDeleted })
  }

  public async failure(error: TodosNotDeletedError): Promise<void> {
    this.view.transform({ error })
  }
}
