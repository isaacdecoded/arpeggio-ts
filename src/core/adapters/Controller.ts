import { UseCase } from '../application'

export interface RequestData {
  [key: string]: string|number|boolean|RequestData
}

export interface Controller<InputData, OutputData> {
  useCase: UseCase<InputData, OutputData>
  execute(requestData?: RequestData): Promise<void> | void
}
