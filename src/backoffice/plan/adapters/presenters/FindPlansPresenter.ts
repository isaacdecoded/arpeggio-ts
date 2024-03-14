import { UseCaseOutputPort } from "@core/application"
import { FindPlansResponseModel } from "../../application/queries"
import { PlansNotFoundError } from "../../application/errors"

export class FindPlansPresenter
  implements UseCaseOutputPort<FindPlansResponseModel>
{
  public async success(responseModel: FindPlansResponseModel): Promise<void> {
    const info: Record<string, string> = {}
    responseModel.plans.forEach(
      (plan, idx) =>
        (info[`Plan ${idx + 1}`] =
          `${plan.id} | ${plan.name} | ${plan.todoCount} todos`),
    )
    console.table({
      FindPlansPresenter: "Plan list:",
      ...info,
    })
  }

  public async failure(error: PlansNotFoundError): Promise<void> {
    console.error(error.message)
  }
}
