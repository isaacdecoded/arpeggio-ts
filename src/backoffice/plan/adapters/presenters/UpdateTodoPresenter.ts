import { UseCaseOutputPort } from "@core/application"
import { TodoNotUpdatedError } from "../../application/errors"
import { UpdateTodoResponseModel } from "../../application/commands"

export class UpdateTodoPresenter
  implements UseCaseOutputPort<UpdateTodoResponseModel>
{
  public async success(responseModel: UpdateTodoResponseModel): Promise<void> {
    console.table({
      UpdateTodoPresenter: `Todo with ID <${responseModel.id.value}> successfully updated.`,
    })
  }

  public async failure(error: TodoNotUpdatedError): Promise<void> {
    console.error(error.message)
  }
}
