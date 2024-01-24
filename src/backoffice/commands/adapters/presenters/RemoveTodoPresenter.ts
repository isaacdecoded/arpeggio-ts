import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodoNotRemovedError } from "../../application/errors"
import { RemoveTodoResponseModel } from "../../application/use-cases"

export interface RemoveTodoViewModel {
  removed?: boolean
  error?: TodoNotRemovedError
}

export class RemoveTodoPresenter
  implements UseCaseOutputPort<RemoveTodoResponseModel>
{
  constructor(private view: View<RemoveTodoViewModel>) {}

  public async success(outputData: RemoveTodoResponseModel): Promise<void> {
    this.view.transform({ removed: outputData.removed })
  }

  public async failure(error: TodoNotRemovedError): Promise<void> {
    this.view.transform({ error })
  }
}
