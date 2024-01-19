import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodoNotCreatedError } from "../../application/errors"
import { CreateTodoResponseModel } from "../../application/use-cases"

export interface CreateTodoViewModel {
  id?: string
  error?: TodoNotCreatedError
}

export class CreateTodoPresenter
  implements UseCaseOutputPort<CreateTodoResponseModel>
{
  constructor(private view: View<CreateTodoViewModel>) {}

  public async success(responseModel: CreateTodoResponseModel): Promise<void> {
    return this.view.transform({ id: responseModel.id.value.toString() })
  }

  public async failure(error: TodoNotCreatedError): Promise<void> {
    return this.view.transform({ error })
  }
}
