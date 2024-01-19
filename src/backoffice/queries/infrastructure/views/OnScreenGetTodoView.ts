import { View } from "@core/adapters"
import { GetTodoViewModel } from "../../adapters/presenters"

export class OnScreenGetTodoView implements View<GetTodoViewModel> {
  public async transform(viewModel: GetTodoViewModel): Promise<void> {
    if (viewModel.error) {
      console.error(viewModel.error.message)
    }
    if (viewModel.todo) {
      console.table({
        OnScreenFindTodosView: "Todo details:",
        Name: viewModel.todo.name,
        CreatedAt: viewModel.todo.createdAt.toISOString(),
        UpdatedAt: viewModel.todo.updatedAt?.toISOString(),
      })
    }
  }
}
