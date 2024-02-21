import { UseCaseOutputPort } from "@core/application"
import { PlanNotFoundError } from "../../application/errors"
import { GetPlanResponseModel } from "../../application/queries"

export class GetPlanPresenter
  implements UseCaseOutputPort<GetPlanResponseModel>
{
  public async success(responseModel: GetPlanResponseModel): Promise<void> {
    console.table({
      GetPlanPresenter: "Plan details:",
      Name: responseModel.plan.name,
      Todos: JSON.stringify(responseModel.plan.todos),
      CreatedAt: responseModel.plan.createdAt.toISOString(),
      UpdatedAt: responseModel.plan.updatedAt?.toISOString(),
    })
  }

  public async failure(error: PlanNotFoundError): Promise<void> {
    console.error(error.message)
  }
}