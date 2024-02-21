import { UseCaseOutputPort } from "@core/application"
import { TodoNotAddedError } from "../../application/errors"
import { CreatePlanResponseModel } from "../../application/commands"

export class CreatePlanPresenter
  implements UseCaseOutputPort<CreatePlanResponseModel>
{
  constructor(public planIdCatcher: (id: string) => void) {}

  public async success(responseModel: CreatePlanResponseModel): Promise<void> {
    const id = responseModel.id.value.toString()
    this.planIdCatcher(id)
    console.table({
      AddTodoPresenter: `Plan with ID <${id}> successfully created.`,
    })
  }

  public async failure(error: TodoNotAddedError): Promise<void> {
    console.error(error.message)
  }
}
