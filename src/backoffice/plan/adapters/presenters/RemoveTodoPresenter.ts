import { UseCaseOutputPort } from "@core/application"
import { RemoveTodoResponseModel } from "../../application/commands"
import { TodoNotAddedError } from "../../application/errors"

export class RemoveTodoPresenter
  implements UseCaseOutputPort<RemoveTodoResponseModel>
{
  public async success(responseModel: RemoveTodoResponseModel): Promise<void> {
    const id = responseModel.todoId
    console.table({
      CheckTodoPresenter: `Todo with ID <${id}> successfully removed.`,
    })
  }

  public async failure(error: TodoNotAddedError): Promise<void> {
    console.table({
      RemoveTodoPresenter: error.message,
    })
  }
}
