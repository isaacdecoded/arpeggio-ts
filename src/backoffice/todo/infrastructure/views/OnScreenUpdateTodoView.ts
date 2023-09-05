import { View } from '@core/adapters'
import { UpdateTodoViewModel } from '../../adapters/presenters'

export class OnScreenUpdateTodoView implements View<UpdateTodoViewModel> {
  public async transform(viewModel: UpdateTodoViewModel): Promise<void> {
    if (viewModel.error) {
      console.error(viewModel.error.message)
    }
    if (viewModel.id) {
      console.info(`Todo with id <${viewModel.id}> successfully updated.`)
    }
  }
}