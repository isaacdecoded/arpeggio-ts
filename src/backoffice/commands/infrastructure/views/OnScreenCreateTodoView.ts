import { View } from "@core/adapters"
import { CreateTodoViewModel } from "../../adapters/presenters"

export class OnScreenCreateTodoView implements View<CreateTodoViewModel> {
  public async transform(viewModel: CreateTodoViewModel): Promise<void> {
    if (viewModel.error) {
      console.error(viewModel.error.message)
    }
    if (viewModel.id) {
      console.table({
        OnScreenCreateTodoView: `Todo with id <${viewModel.id}> successfully created.`,
      })
    }
  }
}
