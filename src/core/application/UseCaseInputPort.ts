export interface UseCaseInputPort<RequestModel> {
  interact(requestModel: RequestModel): Promise<void>
}
