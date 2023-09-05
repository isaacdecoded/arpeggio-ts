export interface Controller<RequestModel> {
  execute(requestData?: RequestModel): Promise<void>
}
