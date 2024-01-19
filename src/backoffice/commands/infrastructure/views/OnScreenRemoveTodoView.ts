import { View } from "@core/adapters"
import { RemoveTodoViewModel } from "../../adapters/presenters"

export class OnScreenRemoveTodoView implements View<RemoveTodoViewModel> {
  public async transform(viewModel: RemoveTodoViewModel): Promise<void> {
    if (viewModel.error) {
      console.error(viewModel.error.message)
    }
    if (viewModel.removed) {
      console.table({ OnScreenRemoveTodoView: `Todo successfully removed.` })
    }
  }
}
