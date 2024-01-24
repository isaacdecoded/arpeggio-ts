import { DomainEventSubscriber } from "@core/domain/events"
import { NotificationService } from "../../domain/aggregates/create-todo/services"
import { TodoCreatedDomainEvent } from "../../domain/aggregates/create-todo/events"

export interface EmailRecipientData {
  address: string
  name: string
}

export class SendNotificationOnTodoCreatedSubscriber
  implements DomainEventSubscriber
{
  constructor(
    private notificationService: NotificationService<EmailRecipientData>
  ) {}

  subscribedTo(): string {
    return TodoCreatedDomainEvent.name
  }

  async on({
    aggregateRootId,
    todoName,
    todoCreatedAt,
  }: TodoCreatedDomainEvent): Promise<void> {
    await this.notificationService.sendNewTodoDetails({
      recipientData: {
        address: "arpeggio@arpeggio",
        name: "Arpeggio",
      },
      todoId: aggregateRootId,
      todoName,
      todoCreatedAt,
    })
  }
}
