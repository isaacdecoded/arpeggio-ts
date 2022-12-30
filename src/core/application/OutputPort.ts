export interface OutputPort<OutputData> {
  success(outputData?: OutputData): Promise<void> | void
  failure(error: unknown): Promise<void> | void
}
