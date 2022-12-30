import { DomainEventBus } from '@core/domain/events'
import { OutputPort } from '@core/application'

// Spy and mock Date object to prevent new Date() mismatches
const mockDate = new Date()
jest.spyOn(global, 'Date').mockReturnValue(mockDate)

// Event bus mock
export const mockDomainEventBus: DomainEventBus = {
  dispatch: jest.fn(),
  addHandlers: jest.fn(),
}

// Event bus mock
export const mockOutputPort: OutputPort<unknown> = {
  failure: jest.fn(),
  success: jest.fn(),
}
