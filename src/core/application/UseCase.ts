import { InputPort } from './InputPort'
import { OutputPort } from './OutputPort'

export interface UseCase<InputData, OutputData> extends InputPort<InputData> {
  outputPort: OutputPort<OutputData>
}
