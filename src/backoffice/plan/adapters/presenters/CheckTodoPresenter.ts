import { UseCaseOutputPort } from "@core/application"
import { CheckTodoResponseModel } from "../../application/commands"
import { TodoNotAddedError } from "../../application/errors"

export class CheckTodoPresenter
  implements UseCaseOutputPort<CheckTodoResponseModel>
{
  public async success(responseModel: CheckTodoResponseModel): Promise<void> {
    const id = responseModel.todoId
    console.table({
      CheckTodoPresenter: `Todo with ID <${id}> successfully checked.`,
    })
  }

  public async failure(error: TodoNotAddedError): Promise<void> {
    console.error(error.message)
  }
}
