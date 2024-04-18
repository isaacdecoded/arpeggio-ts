import { UseCaseOutputPort } from "@core/application"
import { CreatePlanResponseModel } from "../../application/commands"
import { TodoNotAddedError } from "../../application/errors"

export class CreatePlanPresenter
  implements UseCaseOutputPort<CreatePlanResponseModel>
{
  constructor(public planIdCatcher: (id: string) => void) {}

  public async success(responseModel: CreatePlanResponseModel): Promise<void> {
    const id = responseModel.planId
    this.planIdCatcher(id)
    console.table({
      AddTodoPresenter: `Plan with ID <${id}> successfully created.`,
    })
  }

  public async failure(error: TodoNotAddedError): Promise<void> {
    console.error(error.message)
  }
}
