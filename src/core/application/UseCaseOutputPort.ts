export interface UseCaseOutputPort<OutputData> {
  success(outputData?: OutputData): Promise<void>
  failure(error: Error): Promise<void>
}
