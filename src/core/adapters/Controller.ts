import { UseCase } from '../application'

export interface RequestData {
  [key: string]: string|number|boolean|RequestData
}

export interface Controller<InputData> {
  useCase: UseCase<InputData>
  execute(requestData?: RequestData): Promise<void> | void
}
