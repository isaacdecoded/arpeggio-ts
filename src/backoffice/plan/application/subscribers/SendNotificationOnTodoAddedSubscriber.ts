import { DomainEventSubscriber } from "@core/domain/events"
import { TodoAddedDomainEvent } from "@backoffice/plan/domain/events"
import { NotificationService } from "../../domain/services"

export class SendNotificationOnTodoAddedSubscriber
  implements DomainEventSubscriber<TodoAddedDomainEvent>
{
  constructor(private notificationService: NotificationService) {}

  subscribedTo(): string {
    return TodoAddedDomainEvent.name
  }

  async on({
    aggregateRootId,
    todoDescription,
    todoCreatedAt,
  }: TodoAddedDomainEvent): Promise<void> {
    await this.notificationService.notifyTodoAdded({
      todoId: aggregateRootId,
      todoDescription,
      todoCreatedAt,
    })
  }
}
