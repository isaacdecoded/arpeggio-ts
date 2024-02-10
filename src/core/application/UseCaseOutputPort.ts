export interface UseCaseOutputPort<ResponseModel> {
  success(responseModel: ResponseModel): Promise<void>
  failure(error: Error): Promise<void>
}
