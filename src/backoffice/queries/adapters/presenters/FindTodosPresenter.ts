import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodosNotFoundError } from "../../application/errors"
import {
  FindTodosOutputData,
  FindTodosReadModel,
} from "../../application/use-cases"

export interface FindTodosViewModel {
  todos?: FindTodosReadModel[]
  error?: TodosNotFoundError
}

export class FindTodosPresenter
  implements UseCaseOutputPort<FindTodosOutputData>
{
  constructor(private view: View<FindTodosViewModel>) {}

  public async success(outputData: FindTodosOutputData): Promise<void> {
    this.view.transform({ todos: outputData.todos })
  }

  public async failure(error: TodosNotFoundError): Promise<void> {
    this.view.transform({ error })
  }
}
