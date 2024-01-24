export interface NotificationRequest<RecipientData> {
  recipientData: RecipientData
  todoId: string | number
  todoName: string
  todoCreatedAt: Date
}

export interface NotificationService<RecipientData> {
  sendNewTodoDetails(request: NotificationRequest<RecipientData>): Promise<void>
}
