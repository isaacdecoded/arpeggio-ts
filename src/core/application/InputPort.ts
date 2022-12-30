export interface InputPort<InputData> {
  interact(inputData?: InputData): Promise<void> | void
}
