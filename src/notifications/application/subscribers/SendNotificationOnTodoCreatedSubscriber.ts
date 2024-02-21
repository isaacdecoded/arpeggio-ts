import { DomainEventSubscriber } from "@core/domain/events"
import { TodoCreatedDomainEvent } from "@backoffice/plan/domain/events"
import { NotificationService } from "../../domain/services"

export class SendNotificationOnTodoCreatedSubscriber
  implements DomainEventSubscriber<TodoCreatedDomainEvent>
{
  constructor(private notificationService: NotificationService) {}

  subscribedTo(): string {
    return TodoCreatedDomainEvent.name
  }

  async on({
    aggregateRootId,
    todoDescription,
    todoCreatedAt,
  }: TodoCreatedDomainEvent): Promise<void> {
    await this.notificationService.notifyTodoAdded({
      todoId: aggregateRootId,
      todoDescription,
      todoCreatedAt,
    })
  }
}
