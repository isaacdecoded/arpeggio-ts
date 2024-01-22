import { Todo } from "../../domain/aggregates/create-todo/entities"
import { NotificationService } from "../../domain/aggregates/create-todo/services"
import { EmailRecipientData } from "../../application/subscribers/SendNotificationOnTodoCreatedSubscriber"

export class OnScreenNotificationService
  implements NotificationService<EmailRecipientData>
{
  public async sendNewTodoDetails(
    recipientData: EmailRecipientData,
    todo: Todo
  ): Promise<void> {
    console.table({
      ConsoleNotificationService: "Sending Todo details:",
      RecipientAddress: recipientData.address,
      RecipientName: recipientData.name,
      Content: `Todo "${todo.name.value}" has been created.`,
    })
  }
}
