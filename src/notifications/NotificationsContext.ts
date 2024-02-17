import { DomainEventBus } from "@core/domain/events"
import {
  SendNotificationOnTodoCreatedSubscriber,
  SendNotificationOnPlanCompletedSubscriber,
} from "./application/subscribers"
import { OnScreenNotificationService } from "./infrastructure/services"

export class NotificationsContext {
  public static registerSubscribers(domainEventBus: DomainEventBus) {
    const notificationService = new OnScreenNotificationService()
    domainEventBus.addSubscribers([
      new SendNotificationOnTodoCreatedSubscriber(notificationService),
      new SendNotificationOnPlanCompletedSubscriber(notificationService),
    ])
  }
}
