export interface PlanCompletedNotificationRequest {
  planId: string | number
  planName: string
  planCompletedAt: Date
}

export interface TodoAddedNotificationRequest {
  todoId: string | number
  todoDescription: string
  todoCreatedAt: Date
}

export interface NotificationService {
  notifyPlanCompleted(request: PlanCompletedNotificationRequest): Promise<void>
  notifyTodoAdded(request: TodoAddedNotificationRequest): Promise<void>
}
