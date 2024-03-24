export interface PlanCreatedNotificationRequest {
  planId: string | number
  planName: string
  planCreatedAt: Date
}

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
  notifyPlanCreated(request: PlanCreatedNotificationRequest): Promise<void>
  notifyPlanCompleted(request: PlanCompletedNotificationRequest): Promise<void>
  notifyTodoAdded(request: TodoAddedNotificationRequest): Promise<void>
}
