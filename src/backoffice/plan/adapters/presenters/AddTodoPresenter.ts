import { UseCaseOutputPort } from "@core/application"
import { TodoNotAddedError } from "../../application/errors"
import { AddTodoResponseModel } from "../../application/commands"

export class AddTodoPresenter
  implements UseCaseOutputPort<AddTodoResponseModel>
{
  constructor(public todoIdCatcher: (id: string) => void) {}

  public async success(responseModel: AddTodoResponseModel): Promise<void> {
    const id = responseModel.id.value.toString()
    console.table({
      AddTodoPresenter: `Todo with ID <${id}> successfully added.`,
    })
    this.todoIdCatcher(id)
  }

  public async failure(error: TodoNotAddedError): Promise<void> {
    console.error(error.message)
  }
}
