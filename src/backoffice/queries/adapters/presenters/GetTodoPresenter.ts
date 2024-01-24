import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodoNotFoundError } from "../../application/errors"
import {
  GetTodoResponseModel,
  GetTodoReadModel,
} from "../../application/use-cases"

export interface GetTodoViewModel {
  todo?: GetTodoReadModel
  error?: TodoNotFoundError
}

export class GetTodoPresenter
  implements UseCaseOutputPort<GetTodoResponseModel>
{
  constructor(private view: View<GetTodoViewModel>) {}

  public async success(responseModel: GetTodoResponseModel): Promise<void> {
    this.view.transform({ todo: responseModel.todo })
  }

  public async failure(error: TodoNotFoundError): Promise<void> {
    this.view.transform({ error })
  }
}
