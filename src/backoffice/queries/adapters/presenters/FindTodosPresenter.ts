import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodosNotFoundError } from "../../application/errors"
import {
  FindTodosResponseModel,
  FindTodosReadModel,
} from "../../application/use-cases"

export interface FindTodosViewModel {
  todos?: FindTodosReadModel[]
  error?: TodosNotFoundError
}

export class FindTodosPresenter
  implements UseCaseOutputPort<FindTodosResponseModel>
{
  constructor(private view: View<FindTodosViewModel>) {}

  public async success(responseModel: FindTodosResponseModel): Promise<void> {
    this.view.transform({ todos: responseModel.todos })
  }

  public async failure(error: TodosNotFoundError): Promise<void> {
    this.view.transform({ error })
  }
}
