import { View } from '@core/adapters'
import { DeleteTodosViewModel } from '../../adapters/presenters'

export class OnScreenDeleteTodosView implements View<DeleteTodosViewModel> {
  public async transform(viewModel: DeleteTodosViewModel): Promise<void> {
    if (viewModel.error) {
      console.error(viewModel.error.message)
    }
    if (viewModel.totalDeleted) {
      console.info(`Successfully deleted "${viewModel.totalDeleted}" todos.`)
    }
  }
}