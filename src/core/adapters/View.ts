export interface View<ViewModel> {
  transform(viewModel: ViewModel): Promise<void>
}
