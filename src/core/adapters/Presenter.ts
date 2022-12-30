import { OutputPort } from '@core/application'
import { View } from './View'

export interface Presenter<OutputData> extends OutputPort<OutputData> {
  view: View<OutputData>
}
