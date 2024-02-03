import {
  NotificationService,
  NotificationRequest,
} from "../../domain/aggregates/create-todo/services"
import { EmailRecipientData } from "../../application/subscribers/SendNotificationOnTodoCreatedSubscriber"

export class OnScreenNotificationService
  implements NotificationService<EmailRecipientData>
{
  public async sendNewTodoDetails(
    request: NotificationRequest<EmailRecipientData>
  ): Promise<void> {
    console.table({
      OnScreenNotificationService: "Sending Todo details:",
      RecipientAddress: request.recipientData.address,
      RecipientName: request.recipientData.name,
      Content: `Todo <${request.todoName}> has been created at <${request.todoCreatedAt}> with ID <${request.todoId}>.`,
    })
  }
}
