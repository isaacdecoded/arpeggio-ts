import { UseCaseOutputPort } from "@core/application"
import { View } from "@core/adapters"
import { TodoNotFoundError } from "../../application/errors"
import {
  GetTodoOutputData,
  GetTodoReadModel,
} from "../../application/use-cases"

export interface GetTodoViewModel {
  todo?: GetTodoReadModel
  error?: TodoNotFoundError
}

export class GetTodoPresenter implements UseCaseOutputPort<GetTodoOutputData> {
  constructor(private view: View<GetTodoViewModel>) {}

  public async success(outputData: GetTodoOutputData): Promise<void> {
    this.view.transform({ todo: outputData.todo })
  }

  public async failure(error: TodoNotFoundError): Promise<void> {
    this.view.transform({ error })
  }
}
