import { UseCaseOutputPort } from '@core/application'
import { View } from '@core/adapters'
import { Todo } from '../../domain/entities'
import { TodosNotFoundError } from '../../domain/errors'
import { FindTodosOutputData } from '../../application'

export interface FindTodosViewModel {
  todos?: Todo[]
  error?: TodosNotFoundError
}

export class FindTodosPresenter implements UseCaseOutputPort<FindTodosOutputData> {
  constructor(private view: View<FindTodosViewModel>) {}

  public async success(outputData: FindTodosOutputData): Promise<void> {
    this.view.transform({ todos: outputData.todos })
  }

  public async failure(error: TodosNotFoundError): Promise<void> {
    this.view.transform({ error })
  }
}
