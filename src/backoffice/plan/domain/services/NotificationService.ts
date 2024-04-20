export interface PlanCreatedNotificationRequest {
  planId: string
  planName: string
  planCreatedAt: Date
}

export interface PlanCompletedNotificationRequest {
  planId: string
  planName: string
  planCompletedAt: Date
}

export interface TodoAddedNotificationRequest {
  todoId: string
  todoDescription: string
  todoCreatedAt: Date
}

export interface NotificationService {
  notifyPlanCreated(request: PlanCreatedNotificationRequest): Promise<void>
  notifyPlanCompleted(request: PlanCompletedNotificationRequest): Promise<void>
  notifyTodoAdded(request: TodoAddedNotificationRequest): Promise<void>
}
