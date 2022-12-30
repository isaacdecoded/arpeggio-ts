import { ViewModel } from './ViewModel'

export interface View<OutputData> {
  transform(viewModel: ViewModel<OutputData>): Promise<void> | void
}
