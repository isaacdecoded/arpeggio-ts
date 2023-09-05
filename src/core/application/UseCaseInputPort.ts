export interface UseCaseInputPort<InputData> {
  interact(inputData?: InputData): Promise<void>
}
