import { Todo } from "../entities"

export interface NotificationService<RecipientData> {
  sendNewTodoDetails(recipientData: RecipientData, todo: Todo): Promise<void>
}
