import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodoNotUpdatedError } from "../../application/errors"
import { UpdateTodoResponseModel } from "../../application/use-cases"

export interface UpdateTodoViewModel {
  id?: string
  error?: TodoNotUpdatedError
}

export class UpdateTodoPresenter
  implements UseCaseOutputPort<UpdateTodoResponseModel>
{
  constructor(private view: View<UpdateTodoViewModel>) {}

  public async success(outputData: UpdateTodoResponseModel): Promise<void> {
    this.view.transform({ id: outputData.id.value.toString() })
  }

  public async failure(error: TodoNotUpdatedError): Promise<void> {
    this.view.transform({ error })
  }
}
