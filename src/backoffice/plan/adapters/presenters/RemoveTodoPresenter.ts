import { UseCaseOutputPort } from "@core/application"
import { TodoNotRemovedError } from "../../application/errors"
import { RemoveTodoResponseModel } from "../../application/commands"

export class RemoveTodoPresenter
  implements UseCaseOutputPort<RemoveTodoResponseModel>
{
  public async success(responseModel: RemoveTodoResponseModel): Promise<void> {
    console.table({
      RemoveTodoPresenter: `Todo with ID <${responseModel.id.value}> successfully removed.`,
    })
  }

  public async failure(error: TodoNotRemovedError): Promise<void> {
    console.table({
      RemoveTodoPresenter: `ERROR: ${error.message}`,
    })
  }
}
