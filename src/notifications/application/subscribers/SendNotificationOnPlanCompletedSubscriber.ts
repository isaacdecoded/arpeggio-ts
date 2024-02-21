import { DomainEventSubscriber } from "@core/domain/events"
import { PlanCompletedDomainEvent } from "@backoffice/plan/domain/events"
import { NotificationService } from "../../domain/services"

export class SendNotificationOnPlanCompletedSubscriber
  implements DomainEventSubscriber<PlanCompletedDomainEvent>
{
  constructor(private notificationService: NotificationService) {}

  subscribedTo(): string {
    return PlanCompletedDomainEvent.name
  }

  async on({
    aggregateRootId,
    planName,
    occurringTime,
  }: PlanCompletedDomainEvent): Promise<void> {
    await this.notificationService.notifyPlanCompleted({
      planId: aggregateRootId,
      planName,
      planCompletedAt: occurringTime,
    })
  }
}
