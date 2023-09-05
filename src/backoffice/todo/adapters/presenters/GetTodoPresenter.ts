import { UseCaseOutputPort } from '@core/application'
import { View } from '@core/adapters'
import { Todo } from '../../domain/entities'
import { TodoNotFoundError } from '../../domain/errors'
import { GetTodoOutputData } from '../../application'

export interface GetTodoViewModel {
  todo?: Todo
  error?: TodoNotFoundError
}

export class GetTodoPresenter implements UseCaseOutputPort<GetTodoOutputData> {
  constructor(private view: View<GetTodoViewModel>) {}

  public async success(outputData: GetTodoOutputData): Promise<void> {
    this.view.transform({ todo: outputData.todo })
  }

  public async failure(error: TodoNotFoundError): Promise<void> {
    this.view.transform({ error })
  }
}
