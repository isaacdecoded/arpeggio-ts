import { UseCaseOutputPort } from "@core/application"
import { UpdateTodoResponseModel } from "../../application/commands"
import { TodoNotAddedError } from "../../application/errors"

export class UpdateTodoPresenter
  implements UseCaseOutputPort<UpdateTodoResponseModel>
{
  public async success(responseModel: UpdateTodoResponseModel): Promise<void> {
    const id = responseModel.todoId
    console.table({
      UpdateTodoPresenter: `Todo with ID <${id}> successfully updated.`,
    })
  }

  public async failure(error: TodoNotAddedError): Promise<void> {
    console.error(error.message)
  }
}
