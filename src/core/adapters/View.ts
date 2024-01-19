export interface View<ViewModel> {
  // request(requestModel: RequestModel): Promise<void>
  transform(viewModel: ViewModel): Promise<void>
}
