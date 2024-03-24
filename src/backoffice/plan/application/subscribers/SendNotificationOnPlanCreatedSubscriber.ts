import { DomainEventSubscriber } from "@core/domain/events"
import { PlanCreatedDomainEvent } from "@backoffice/plan/domain/events"
import { NotificationService } from "../../domain/services"

export class SendNotificationOnPlanCreatedSubscriber
  implements DomainEventSubscriber<PlanCreatedDomainEvent>
{
  constructor(private notificationService: NotificationService) {}

  subscribedTo(): string {
    return PlanCreatedDomainEvent.name
  }

  async on({
    aggregateRootId,
    planName,
    occurringTime,
  }: PlanCreatedDomainEvent): Promise<void> {
    await this.notificationService.notifyPlanCreated({
      planId: aggregateRootId,
      planName,
      planCreatedAt: occurringTime,
    })
  }
}
