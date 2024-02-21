import { UseCaseOutputPort } from "@core/application"
import { TodoNotUpdatedError } from "../../application/errors"
import { CheckTodoResponseModel } from "../../application/commands"

export class CheckTodoPresenter
  implements UseCaseOutputPort<CheckTodoResponseModel>
{
  public async success(responseModel: CheckTodoResponseModel): Promise<void> {
    console.table({
      CheckTodoPresenter: `Todo with ID <${responseModel.id.value}> successfully checked.`,
    })
  }

  public async failure(error: TodoNotUpdatedError): Promise<void> {
    console.error(error.message)
  }
}
