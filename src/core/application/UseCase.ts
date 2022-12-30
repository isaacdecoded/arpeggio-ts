import { InputPort } from './InputPort'
import { OutputPort } from './OutputPort'

export interface UseCase<InputData> extends InputPort<InputData> {
  outputPort: OutputPort<unknown>
}
