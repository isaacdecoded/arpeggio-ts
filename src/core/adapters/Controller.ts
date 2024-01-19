export interface Controller<RequestObject> {
  execute(requestObject?: RequestObject): Promise<void>
}
